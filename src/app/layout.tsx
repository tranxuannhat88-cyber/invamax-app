import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INVAMAX FA - Nền tảng Đánh giá Năng lực Nhà máy",
  description: "Assess Factory Capability. Make Better Decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
