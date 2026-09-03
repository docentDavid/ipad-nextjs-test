type ProductCardProps = {
  emoji: string;
  title: string;
  description: string;
  price: number;
};

export default function ProductCard({
  emoji,
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid h-40 place-items-center bg-slate-50 text-6xl" aria-hidden="true">
        {emoji}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 flex-1 leading-7 text-slate-600">{description}</p>
        <p className="mt-5 font-semibold text-slate-950">
          € {price} <span className="font-normal text-slate-500">per maand</span>
        </p>
        <button
          type="button"
          className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
        >
          Bekijk product
        </button>
      </div>
    </article>
  );
}