import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
