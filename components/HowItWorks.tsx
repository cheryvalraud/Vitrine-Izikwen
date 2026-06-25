const steps = [
  {
    title: "Select the route",
    copy: "Start with the available rail, payment option, and payout method for the user's market.",
  },
  {
    title: "Authorize the details",
    copy: "Confirm amount, timing, recipient information, and verification requirements before the transfer advances.",
  },
  {
    title: "Settle with status",
    copy: "Show a clean completion state, route status, and support path when a question needs a human response.",
  },
];

const safeguards = [
  "Verification steps for supported workflows",
  "Transaction review before completion",
  "Privacy-conscious product decisions",
  "Support paths for user questions",
];

export default function HowItWorks() {
  return (
    <>
      <section
        id="flow"
        className="px-4 py-16 sm:px-6 lg:py-24"
        aria-labelledby="how-title"
      >
        <div className="mx-auto grid max-w-[358px] gap-10 sm:max-w-6xl lg:grid-cols-[0.76fr_1.24fr]">
          <div className="reveal-on-scroll">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a19]">
              Transfer flow
            </p>
            <h2
              id="how-title"
              className="mt-3 text-3xl font-semibold tracking-normal text-[#07111f] sm:text-4xl"
            >
              A controlled sequence for important transfers.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#52606d]">
              Izikwen keeps money movement composed: route clearly, review the
              sensitive details, and show users exactly where their transfer
              stands.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                style={{ animationDelay: `${index * 130}ms` }}
                className="reveal-on-scroll card-lift group relative grid overflow-hidden rounded-[8px] border border-[#d8d0c2] bg-white p-5 shadow-[0_14px_48px_rgba(7,17,31,0.05)] sm:grid-cols-[64px_1fr] sm:p-6"
              >
                <span className="motion-sheen" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#07111f] font-mono text-base font-semibold text-[#f4d187] transition group-hover:bg-[#27d6c3] group-hover:text-[#07111f]">
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

      <section
        id="trust"
        className="bg-[#07111f] px-4 py-16 text-white sm:px-6 lg:py-24"
        aria-labelledby="security-title"
      >
        <div className="reveal-on-scroll mx-auto grid max-w-[358px] gap-8 sm:max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#f4d187]">
              Trust controls
            </p>
            <h2
              id="security-title"
              className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-4xl"
            >
              Built around review, verification, and support.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#c7d2df]">
              The product direction is designed with verification, transaction
              review, and responsible workflows in mind. Availability of
              features may vary by region and supported partners.
            </p>
          </div>

          <div className="grid gap-3 self-center">
            {safeguards.map((item, index) => (
              <div
                key={item}
                style={{ animationDelay: `${index * 90}ms` }}
                className="reveal-on-scroll card-lift flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-[#d9e3ee]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#27d6c3]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
