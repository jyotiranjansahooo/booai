import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Toaster } from "sonner";
import { ui } from '@clerk/ui'
import Navbar from "@/components/ui/navbar";
import "./globals.css";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "BOOK MOUNTAIN",
  description:
    "BOOK with special power to tell and answer to your questions using voice and text.",
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
          <Footer/>
          <Toaster
            richColors
            position="top-right"
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
