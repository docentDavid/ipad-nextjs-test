import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ACME — Slimme oplossingen",
    template: "%s | ACME",
  },
  description:
    "ACME levert heldere, betrouwbare oplossingen voor moderne teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}