// Brand color - used in JS files where CSS variables aren't available
export const BRAND_COLOR = '#212a3b'; // Dark blue-gray
export const BRAND_COLOR_HOVER = '#3d485e'; // Medium blue-gray

// Sample books for the homepage (using Open Library covers)
// export const sampleBooks = [
//     {
//         _id: '1',
//         title: 'Clean Code',
//         author: 'Robert Cecil Martin',
//         slug: 'clean-code',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '2',
//         title: 'JavaScript: The Definitive Guide',
//         author: 'David Flanagan',
//         slug: 'javascript-the-definitive-guide',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9780596805524-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '3',
//         title: 'Brave New World',
//         author: 'Aldous Huxley',
//         slug: 'brave-new-world',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9780060850524-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '4',
//         title: 'Rich Dad Poor Dad',
//         author: 'Robert Kiyosaki',
//         slug: 'rich-dad-poor-dad',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9781612680194-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '5',
//         title: 'Deep Work',
//         author: 'Cal Newport',
//         slug: 'deep-work',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '6',
//         title: 'How to Win Friends and Influence People',
//         author: 'Dale Carnegie',
//         slug: 'how-to-win-friends-and-influence-people',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9780671027032-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '7',
//         title: 'The Power of Habit',
//         author: 'Charles Duhigg',
//         slug: 'the-power-of-habit',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9781400069286-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '8',
//         title: 'Atomic Habits',
//         author: 'James Clear',
//         slug: 'atomic-habits',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '9',
//         title: 'The Courage to Be Disliked',
//         author: 'Fumitake Koga & Ichiro Kishimi',
//         slug: 'the-courage-to-be-disliked',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9781501197274-M.jpg',
//         coverColor: '#f8f4e9',
//     },
//     {
//         _id: '10',
//         title: '1984',
//         author: 'George Orwell',
//         slug: '1984',
//         coverURL: 'https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg',
//         coverColor: '#f8f4e9',
//     },
// ];

// File validation helpers
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_PDF_TYPES = ['application/pdf'];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Pre-configured VAPI assistant ID (hardcoded for this app)
export const ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID!;

// OpenAI voice IDs supported by the Vapi web SDK.
export const voiceOptions = {
  // Male Voices
  echo: {
    id: 'echo',
    name: 'Echo',
    description: 'Warm male voice, friendly and conversational'
  },

  onyx: {
    id: 'onyx',
    name: 'Onyx',
    description: 'Deep confident male voice, premium audiobook feel'
  },

  fable: {
    id: 'fable',
    name: 'Fable',
    description: 'British-style male voice, intelligent and polished'
  },

  // Female Voices
  shimmer: {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Soft friendly female voice, natural bookstore assistant'
  },

  nova: {
    id: 'nova',
    name: 'Nova',
    description: 'Modern energetic female voice, engaging and expressive'
  }
};


// Voice categories for the selector UI
export const voiceCategories = {
    male: ['echo', 'onyx', 'fable'],
    female: ['shimmer', 'nova'],
};

// Default voice
export const DEFAULT_VOICE = 'echo';

// OpenAI voice settings optimized for conversational AI.
export const VOICE_SETTINGS = {
    speed: 1.0, // Natural conversation speed
};

// VAPI configuration for natural conversation
// NOTE: These settings should be configured in the VAPI Dashboard for the assistant
// They are kept here for reference and documentation purposes
export const VAPI_DASHBOARD_CONFIG = {
    // Turn-taking settings
    startSpeakingPlan: {
        smartEndpointingEnabled: true,
        waitSeconds: 0.4,
    },
    stopSpeakingPlan: {
        numWords: 2,
        voiceSeconds: 0.2,
        backoffSeconds: 1.0,
    },
    // Timing settings
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    llmRequestDelaySeconds: 0.1,
    // Conversation features
    backgroundDenoisingEnabled: true,
    backchannelingEnabled: true,
    fillerInjectionEnabled: false,
};

// Clerk appearance overrides - Warm Literary Style
// Note: Tailwind requires static class names at build time, so we hardcode color values here
export const CLERK_AUTH_APPEARANCE_OVERRIDE = {
    rootBox: 'mx-auto',
    card: 'shadow-none border-none rounded-xl bg-transparent',
    headerTitle: '!text-2xl font-bold text-[#212a3b]',
    headerSubtitle: '!mt-3 !text-sm text-[#3d485e]',
    socialButtonsBlockButton:
        '!border border-[rgba(33,42,59,0.12)] hover:bg-[#212a3b]/10 transition-all h-12 text-lg !rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)]',
    socialButtonsBlockButtonText: 'font-medium !text-[#212a3b] !text-lg',
    formButtonPrimary:
        'bg-[#212a3b] hover:bg-[#3d485e] text-white font-medium !border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)] normal-case !h-12 !text-lg !rounded-xl',
    formFieldInput:
        '!border !border-[rgba(33,42,59,0.12)] !rounded-xl focus:ring-[#212a3b] focus:border-[#212a3b] !h-12 !min-h-12 !text-lg !bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06)]',
    formFieldLabel: 'text-[#212a3b] font-medium text-lg',
    footerActionLink: 'text-[#212a3b] hover:text-[#3d485e] text-base font-medium',
};

