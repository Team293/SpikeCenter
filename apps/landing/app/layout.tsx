import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@spike/ui/styles/globals.css";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { GsapProvider } from "~/components/gsap-provider";
import { TransitionProvider } from "~/components/transition-provider";
import { TRPCProvider } from "@spike/client/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innovate. Create. Inspire.",
  description: "Awwwards-inspired site using Next.js, GSAP, and Three.js",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#0a0a0a] text-white">
        <GsapProvider>
          <TRPCProvider>
            <TransitionProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </TransitionProvider>
          </TRPCProvider>
        </GsapProvider>
      </body>
    </html>
  );
}
