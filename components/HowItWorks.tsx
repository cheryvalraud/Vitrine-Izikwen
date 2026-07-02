const steps = [
  {
    title: "Open your vault",
    copy: "Verify your identity and set up a private Izikwen vault built for holding digital assets.",
  },
  {
    title: "Fund with BTC, ETH, or USDT",
    copy: "Deposit from an existing wallet or exchange. Every deposit is confirmed before it is credited.",
  },
  {
    title: "Move with confidence",
    copy: "Send, hold, or convert with review-first controls and a clear status at every step.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="flow"
      className="px-4 py-16 sm:px-6 lg:py-24"
      aria-labelledby="how-title"
    >
      <div className="mx-auto grid max-w-[358px] gap-10 sm:max-w-6xl lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a19]">
            How it works
          </p>
          <h2
            id="how-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#07111f] sm:text-4xl"
          >
            Three steps. No guesswork.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#52606d]">
            Izikwen keeps the experience clear: open your vault, fund it, and
            move value with a system that always shows you where things
            stand.
          </p>
        </div>

        <div className="grid gap-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="card-lift group relative grid overflow-hidden rounded-3xl border border-[#d8d0c2] bg-white p-5 shadow-[0_14px_48px_rgba(7,17,31,0.05)] sm:grid-cols-[64px_1fr] sm:p-6"
            >
              <span className="motion-sheen" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07111f] text-base font-semibold text-[#f4d187] transition group-hover:bg-[#27d6c3] group-hover:text-[#07111f]">
                {index + 1}
              </div>
              <div className="relative">
                <h3 className="text-xl font-semibold text-[#07111f]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#52606d]">
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
