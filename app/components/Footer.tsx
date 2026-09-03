import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} ACME. Alle rechten voorbehouden.</p>
        <nav aria-label="Footernavigatie" className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/products">Producten</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}