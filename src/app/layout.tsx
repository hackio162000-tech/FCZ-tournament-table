import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNG Tournament Maker - Cyberpunk Edition",
  description:
    "Create and manage tournament points tables with a cyberpunk theme. Share with friends instantly!",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
