// ============================================
// SHARED TYPES
// ============================================

export interface CreateBook {
    clerkId: string;
    title: string;
    author: string;
    persona?: string;
    fileURL: string;
    fileBlobKey: string;
    coverURL?: string;
    coverBlobKey?: string;
    fileSize: number;
}

export interface TextSegment {
    text: string;
    segmentIndex: number;
    pageNumber?: number;
    wordCount: number;
}

export interface BookCardProps {
    title: string;
    author: string;
    coverURL: string;
    slug: string;
}

export interface BookUploadFormValues {
    title: string;
    author: string;
    persona?: string;
    pdfFile?: File;
    coverImage?: File;
}

export interface Messages {
    role: string;
    content: string;
}

export interface ShadowBoxProps {
    children: React.ReactNode;
    className?: string;
}

export interface VoiceSelectorProps {
    disabled?: boolean;
    className?: string;
    value?: string;
    onChange: (voiceId: string) => void;
}
