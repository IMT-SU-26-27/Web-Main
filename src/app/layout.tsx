import "./globals.css";
import Providers from "@/components/utils/Providers";
import NavigationBar from "@/components/NavigationBar";
import type { Metadata } from "next";

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
      <body suppressHydrationWarning>
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
