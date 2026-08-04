import "./globals.css";
import Providers from "@/components/utils/Providers";
import NavigationBar from "@/components/NavigationBar";
import type { Metadata } from "next";
import { pixelify, cinzel } from '@/lib/utils/font'
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SU IMT UC",
  description: "The Official Website of SU IMT UC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelify.variable} ${cinzel.variable} antialiased`}>
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
        <Footer></Footer>
      </body>
    </html>
  );
}
