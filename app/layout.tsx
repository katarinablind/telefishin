import type { Metadata } from "next";
import "./globals.css";
import { ViewportGuard } from "@/components/ViewportGuard";

export const metadata: Metadata = {
  title: "telefishin'",
  description: "A fish tank with all your long and short distance friends. Keep in touch without the stress of replying. And just keep swimming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen font-sans">
        <ViewportGuard>{children}</ViewportGuard>
      </body>
    </html>
  );
}
