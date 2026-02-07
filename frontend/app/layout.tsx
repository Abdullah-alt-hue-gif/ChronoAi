import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "ChronoAI - AI-Powered Event Scheduling",
  description: "Intelligent scheduling for tournaments, conferences, and hackathons.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans text-text-main bg-bg-page antialiased">
        <AuthProvider>
          <Navbar />
          <Toast />
          <ConfirmationModal />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
