import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <body>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}