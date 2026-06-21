'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImageIcon, Loader2 } from 'lucide-react';
import { UploadSchema } from '@/lib/zod';
import { BookUploadFormValues } from '@/app/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from '@/lib/constants';
import FileUploader from './FileUploader';
import VoiceSelector from './VoiceSelector';
import LoadingOverlay from './LoadingOverlay';
import {useAuth} from "@clerk/nextjs";
import { toast } from 'sonner';
import {checkBookExists, createBook, saveBookSegments} from "@/lib/actions/book.actions";
import {useRouter} from "next/navigation";
import {parsePDFFile} from "@/lib/utils";
import {upload} from "@vercel/blob/client";



const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Uploading and processing...');
    const { userId } = useAuth();
    const router = useRouter()

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            genre: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        if(!userId) {
           return toast.error("Please login to upload books");
        }

        setIsSubmitting(true);
        setLoadingMessage('Checking your book details...');

        // PostHog -> Track Book Uploads...

        try {
            const existsCheck = await checkBookExists(data.title);

            if(existsCheck.exists && existsCheck.book) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${existsCheck.book.slug}`)
                return;
            }

            const fileTitle = data.title.replace(/\s+/g, '-').toLowerCase();
            const pdfFile = data.pdfFile;

            if (!pdfFile) {
                toast.error("Please select a PDF file before uploading.");
                setIsSubmitting(false);
                return;
            }

            setLoadingMessage('Parsing PDF file...');
            const parsedPDF = await parsePDFFile(pdfFile);

            if(parsedPDF.content.length === 0) {
                toast.error("Failed to parse PDF. Please try again with a different file.");
                return;
            }

            setLoadingMessage('Uploading PDF file...');
            let uploadedPdfBlob;
            try {
                uploadedPdfBlob = await upload(fileTitle, pdfFile, {
                    access: 'public',
                    handleUploadUrl: '/api/uploads',
                    contentType: 'application/pdf'
                });
            } catch (err) {
                console.error('PDF upload failed', err);
                const msg = err instanceof Error ? err.message : 'PDF upload failed';
                toast.error(msg || 'Failed to upload PDF. Try a smaller file.');
                setIsSubmitting(false);
                return;
            }

            let coverUrl: string;

            if(data.coverImage) {
                setLoadingMessage('Uploading cover image...');
                const coverFile = data.coverImage;
                try {
                    const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, coverFile, {
                        access: 'public',
                        handleUploadUrl: '/api/uploads',
                        contentType: coverFile.type
                    });
                    coverUrl = uploadedCoverBlob.url;
                } catch (err) {
                    console.error('Cover upload failed', err);
                    const msg = err instanceof Error ? err.message : 'Cover upload failed';
                    toast.error(msg || 'Failed to upload cover image.');
                    setIsSubmitting(false);
                    return;
                }
            } else {
                setLoadingMessage('Generating cover preview...');
                const response = await fetch(parsedPDF.cover)
                const blob = await response.blob();

                try {
                    const uploadedCoverBlob = await upload(`${fileTitle}_cover.png`, blob, {
                        access: 'public',
                        handleUploadUrl: '/api/uploads',
                        contentType: 'image/png'
                    });
                    coverUrl = uploadedCoverBlob.url;
                } catch (err) {
                    console.error('Generated cover upload failed', err);
                    const msg = err instanceof Error ? err.message : 'Cover upload failed';
                    toast.error(msg || 'Failed to upload generated cover image.');
                    setIsSubmitting(false);
                    return;
                }
            }

            setLoadingMessage('Saving book and starting synthesis...');
            const book = await createBook({
                clerkId: userId,
                title: data.title,
                author: data.author,
                genre: data.genre,
                persona: data.persona,
                fileURL: uploadedPdfBlob.url,
                fileBlobKey: uploadedPdfBlob.pathname,
                coverURL: coverUrl,
                fileSize: pdfFile.size,
            });

            if(!book.success) {
                toast.error(book.error as string || "Failed to create book");
                if (book.isBillingError) {
                    router.push("/subscriptions");
                }
                return;
            }

            if(book.alreadyExists) {
                toast.info("Book with same title already exists.");
                form.reset()
                router.push(`/books/${book.data.slug}`)
                return;
            }

            const segments = await saveBookSegments(book.data._id, userId, parsedPDF.content);

            if(!segments.success) {
                toast.error("Failed to save book segments");
                throw new Error("Failed to save book segments");
            }

            form.reset();
            toast.success("Book uploaded successfully!");
            router.push('/');
        } catch (error) {
            console.error(error);

            toast.error("Failed to upload book. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isSubmitting && <LoadingOverlay title={loadingMessage} />}

            <div className="new-book-wrapper ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* 1. PDF File Upload */}
                        <FileUploader
                            control={form.control}
                            name="pdfFile"
                            label="Book PDF File"
                            acceptTypes={ACCEPTED_PDF_TYPES}
                            icon={Upload}
                            placeholder="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            disabled={isSubmitting}
                        />

                        {/* 2. Cover Image Upload */}
                        <FileUploader
                            control={form.control}
                            name="coverImage"
                            label="Cover Image (Optional)"
                            acceptTypes={ACCEPTED_IMAGE_TYPES}
                            icon={ImageIcon}
                            placeholder="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            disabled={isSubmitting}
                        />

                        {/* 3. Title Input */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Harry Potter and the Philosopher's Stone "
                                            value={field.value as string}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 4. Author Input */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Author Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: J.K. Rowling"
                                            value={field.value as string}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 5. Genre Selection */}
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Genre (Optional)</FormLabel>
                                    <FormControl>
                                        <select
                                            className="form-input"
                                            value={field.value as string}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            disabled={isSubmitting}
                                        >
                                            <option value="">Select a genre</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Non-Fiction">Non-Fiction</option>
                                            <option value="Mystery">Mystery</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Science Fiction">Science Fiction</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Thriller">Thriller</option>
                                            <option value="Horror">Horror</option>
                                            <option value="Biography">Biography</option>
                                            <option value="History">History</option>
                                            <option value="Self-Help">Self-Help</option>
                                            <option value="Educational">Educational</option>
                                            <option value="Poetry">Poetry</option>
                                            <option value="Drama">Drama</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 6. Voice Selector */}
                        <FormField
                            control={form.control}
                            name="persona"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                    <FormControl >
                                        <VoiceSelector
                                            value={field.value as string}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 7. Submit Button */}
                        <Button type="submit" className="form-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="inline-flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Beginning Synthesis...
                                </span>
                            ) : (
                                'Upload Book'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default UploadForm;