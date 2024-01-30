import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./_trpc/Provider";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "ECHO",
  description: "chat with your pdf's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className="font-montserrat ">
          <SessionProviderWrapper>
            <Navbar />
            {children}
          </SessionProviderWrapper>
        </body>
      </Provider>
    </html>
  );
}
