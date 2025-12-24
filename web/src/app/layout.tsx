import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// 버전 정보 (빌드 타임에 결정)
const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || "dev";

export const metadata: Metadata = {
  title: `GG POKER (${commitHash})`,
  description: "Exclusive VIP shopping experience for GG POKER members",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
