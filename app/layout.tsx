import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Toaster } from 'sonner';

import Navbar from "@/components/ui/navbar";
import "./globals.css";

const ibmPlexSerif=IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const monaSans=Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "BOOK MOUNTAIN",
  description: "BOOK with special power to tell and answer to your questions using voice and text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSerif.variable} ${monaSans.variable} relative font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <a href="/sign-in" className="text-sm text-slate-700 hover:text-slate-900 transition">
                Sign In
              </a>
              <a href="/sign-up" className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 inline-flex items-center justify-center">
                Sign Up
              </a>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}
