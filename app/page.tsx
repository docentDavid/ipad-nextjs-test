import Link from "next/link";

const benefits = [
  {
    title: "Eenvoudig",
    description: "Duidelijke oplossingen waarmee je direct aan de slag kunt.",
  },
  {
    title: "Schaalbaar",
    description: "Een solide basis die met je organisatie meegroeit.",
  },
  {
    title: "Betrokken",
    description: "Persoonlijke ondersteuning door mensen die met je meedenken.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="overflow-hidden border-b border-slate-200 bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 font-semibold text-indigo-600">Slimmer samenwerken</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Slimme oplossingen, zonder gedoe
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              ACME helpt teams vooruit met heldere producten, vriendelijke
              service en technologie die gewoon werkt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Bekijk producten
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Neem contact op
              </Link>
            </div>
          </div>

          <div
            className="grid aspect-[4/3] place-items-center rounded-3xl border border-indigo-100 bg-white text-8xl shadow-xl shadow-indigo-100/70"
            aria-hidden="true"
          >
            ⚙️
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-950">
                {benefit.title}
              </h2>
              <p className="mt-2 leading-7 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}