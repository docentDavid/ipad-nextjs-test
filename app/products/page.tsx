import type { Metadata } from "next";
import ProductCard from "@/app/components/ProductCard";

export const metadata: Metadata = {
  title: "Producten",
  description: "Bekijk de oplossingen van ACME.",
};

const products = [
  {
    id: 1,
    emoji: "🧰",
    title: "ACME Toolkit",
    description: "Een complete gereedschapskist voor teams die sneller willen werken.",
    price: 49,
  },
  {
    id: 2,
    emoji: "📦",
    title: "ACME Box",
    description: "Veilige opslag en eenvoudig delen zonder je werkproces te vertragen.",
    price: 29,
  },
  {
    id: 3,
    emoji: "🤖",
    title: "ACME Assist",
    description: "Slimme automatisering voor terugkerende werkzaamheden.",
    price: 99,
  },
];

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        <p className="font-semibold text-indigo-600">Ons aanbod</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Producten
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Kies de oplossing die aansluit bij de manier waarop jouw team werkt.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}