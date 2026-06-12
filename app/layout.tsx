import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Toaster } from "sonner";
import { ui } from '@clerk/ui'
import Navbar from "@/components/ui/navbar";
import "./globals.css";
import AppLoader from "@/components/AppLoader";
import Footer from "@/components/ui/footer";




export const metadata: Metadata = {
title: {
    default: "Bookified",
    template: "%s | Bookified",
  },  description:
    "Upload books, chat with AI, listen to content, and discover knowledge through interactive conversations. Bookified turns reading into an intelligent experience.",

icons: {
  icon: "/bookifiedlogo.png",
  shortcut: "/bookifiedlogo.png",
  apple: "/bookifiedlogo.png",
},

  keywords: [
    "AI books",
    "book chat",
    "AI reading assistant",
    "PDF chatbot",
    "voice reading",
    "AI conversations",
    "interactive books",
    "knowledge assistant",
    "Bookified",
    "book AI",
  ],

  authors: [
    {
      name: "Bookified",
    },
  ],

  creator: "Bookified",

  metadataBase: new URL("https://bookified.ai"),

  openGraph: {
    title: "Bookified - Transform Books Into AI Conversations",
    description:
      "Turn books into intelligent conversations. Upload, read, listen, and learn with AI.",
    url: "https://bookified.ai",
    siteName: "Bookified",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/public/bookifiedlogo.png",
        width: 1200,
        height: 630,
        alt: "Bookified AI Reading Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bookified - AI Powered Reading",
    description:
      "Upload books, talk with AI, and unlock deeper understanding.",
    images: ["/public/bookifiedlogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "Education",

 
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
      <body className="antialiased">
        <ClerkProvider ui={ui}>
          <AppLoader>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          <Navbar/>
          {children}
          <Footer />
          <Toaster
            richColors
            position="top-right"
          />
          </AppLoader>
        </ClerkProvider>
      </body>
    </html>
  );
}
