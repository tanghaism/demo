import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proofly",
  description: "重要资料先存起来 — 本地优先的重要资料富媒体备忘录",
  generator: "v0.app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F8FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="bg-[#E0E6F0]">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
