import {NextResponse} from "next/server";
import {handleUpload, HandleUploadBody} from "@vercel/blob/client";
import {auth} from "@clerk/nextjs/server";
import {MAX_FILE_SIZE} from "@/lib/constants";

class AuthError extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'AuthError';
    }
}

function getClientErrorResponse(error: unknown) {
    if (error instanceof AuthError) {
        return { status: 401, message: 'Unauthorized' };
    }

    if (error instanceof Error) {
        if (/size|limit|maximum/i.test(error.message)) {
            return { status: 400, message: 'File too large' };
        }
        if (/invalid|body|json/i.test(error.message)) {
            return { status: 400, message: 'Invalid upload request' };
        }
    }

    return { status: 500, message: 'Upload failed' };
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const token = process.env.BLOB_READ_WRITE_TOKEN;

        if (!token) {
            console.error('Missing BLOB_READ_WRITE_TOKEN environment variable');
            return NextResponse.json({ error: 'Server misconfigured: BLOB_READ_WRITE_TOKEN not set' }, { status: 500 });
        }

        const body = (await request.json()) as HandleUploadBody;

        const jsonResponse = await handleUpload({
            token: token,
            body,
            request,
            onBeforeGenerateToken: async () => {
                const { userId } = await auth();

                if(!userId) {
                    throw new AuthError('User not authenticated');
                }

                return {
                    allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
                    addRandomSuffix: true,
                    maximumSizeInBytes: MAX_FILE_SIZE,
                    tokenPayload: JSON.stringify({ userId })
                }
        } ,
            onUploadCompleted: async ({ blob }) => {
                console.log('File uploaded to blob: ', blob.url)

                // TODO: PostHog
            }
        });

        return NextResponse.json(jsonResponse)
    } catch (e) {
        const { status, message } = getClientErrorResponse(e);
        const rawMessage = e instanceof Error ? e.message : 'Unknown error';
        console.error('Upload error', { message: rawMessage, error: e });
        return NextResponse.json({ error: message }, { status });
    }
}
