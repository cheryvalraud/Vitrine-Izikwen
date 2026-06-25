const values = [
  {
    label: "Local payment paths",
    copy: "Design transfers around the ways customers already pay, receive, and cash out.",
  },
  {
    label: "Digital value",
    copy: "Support movement between stored value, wallets, and available payout destinations.",
  },
  {
    label: "Clear review",
    copy: "Keep the amount, recipient, timing, and status easy to understand before completion.",
  },
  {
    label: "Support access",
    copy: "Give users a direct path to help when a transfer needs attention.",
  },
];

export default function ValueCards() {
  return (
    <section
      id="rails"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
      aria-labelledby="value-title"
    >
      <div className="mx-auto max-w-[358px] sm:max-w-6xl">
        <div className="reveal-on-scroll max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a19]">
            Product focus
          </p>
          <h2
            id="value-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#07111f] sm:text-4xl"
          >
            A cleaner way to present money movement.
          </h2>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => (
            <article
              key={item.label}
              style={{ animationDelay: `${index * 110}ms` }}
              className="reveal-on-scroll card-lift group relative overflow-hidden rounded-3xl border border-[#d8d0c2] bg-white p-5 shadow-[0_18px_55px_rgba(7,17,31,0.06)]"
            >
              <span className="motion-sheen" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8d0c2] bg-[#f6f2ea] text-sm font-bold text-[#7a5a19] transition group-hover:border-[#27d6c3]/40 group-hover:bg-[#07111f] group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="relative mt-8 text-lg font-semibold text-[#07111f]">
                {item.label}
              </h3>
              <p className="relative mt-3 text-sm leading-6 text-[#52606d]">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
