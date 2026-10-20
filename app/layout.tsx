import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "缤琪灵 · AI 视频创作",
  description: "从灵感到视频，再到你的作品广场。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
