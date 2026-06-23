const values = [
  {
    label: "Local payment paths",
    copy: "Choose supported routes that fit the way people already move money.",
  },
  {
    label: "Digital value access",
    copy: "Move between digital value and practical payout options with fewer steps.",
  },
  {
    label: "Mobile-first flow",
    copy: "A focused experience built for quick review on everyday devices.",
  },
  {
    label: "Human support",
    copy: "Give users a clear place to ask questions before and after a transfer.",
  },
];

export default function ValueCards() {
  return (
    <section
      className="px-4 py-8 sm:px-6 sm:py-16 lg:py-20"
      aria-labelledby="value-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">
            What it supports
          </p>
          <h2
            id="value-title"
            className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl"
          >
            Useful money movement without the noise.
          </h2>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => (
            <article
              key={item.label}
              className="group rounded-lg border border-emerald-500/15 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-emerald-500/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-sm font-bold text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-slate-950">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
