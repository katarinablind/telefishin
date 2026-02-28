import type { Metadata } from "next";
import "./globals.css";
import { ViewportGuard } from "@/components/ViewportGuard";

export const metadata: Metadata = {
  title: "Telefishin'",
  description: "A fish tank with all your long and short distance friends. Keep in touch without the stress of replying. And just keep swimming.",
  icons: {
    icon: "/assets/9914ebe650bf556ad948759f92f9be62915bd20a.png", // fish 3
  },
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
