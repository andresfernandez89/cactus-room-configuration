import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Room Configurator",
  description: "3D room configurator built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
