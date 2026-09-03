import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Producten" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold tracking-tight text-slate-950"
          aria-label="ACME-homepage"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white">
            A
          </span>
          <span>ACME</span>
        </Link>

        <nav aria-label="Hoofdnavigatie">
          <ul className="flex items-center gap-4 text-sm font-medium sm:gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-600 transition hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}