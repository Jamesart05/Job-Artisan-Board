import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Craftwork",
  description: "A fullstack artisan job board with authentication, hiring flows, and role-based dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
           <Providers>{children}</Providers>
      </body>
    </html>
  );
}
