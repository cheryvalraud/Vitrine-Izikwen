const steps = [
  {
    title: "Choose the transfer path",
    copy: "Start with the available payment method and payout option for the customer's market.",
  },
  {
    title: "Review the details",
    copy: "Confirm the amount, recipient, timing, and verification requirements before the transfer moves forward.",
  },
  {
    title: "Track the status",
    copy: "Show a clear completion state and a support path when a question needs a human response.",
  },
];

const safeguards = [
  "Verification steps for supported workflows",
  "Transaction review before completion",
  "Privacy-conscious product decisions",
  "Direct support through contact@izikwen.com",
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a19]">
              Transfer flow
            </p>
            <h2
              id="how-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[#07111f] sm:text-4xl"
            >
              Simple steps for important transfers.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#52606d]">
              Izikwen keeps the experience clear: choose the path, review the
              sensitive details, and know where the transfer stands.
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

      <section
        id="trust"
        className="bg-[#07111f] px-4 py-16 text-white sm:px-6 lg:py-24"
        aria-labelledby="security-title"
      >
        <div className="mx-auto grid max-w-[358px] gap-8 sm:max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4d187]">
              Trust and support
            </p>
            <h2
              id="security-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
            >
              Built around review, verification, and help.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#eef3f8]">
              The product direction is designed with verification, transaction
              review, and responsible support workflows in mind. Availability
              may vary by region and supported partners.
            </p>
          </div>

          <div className="grid gap-3 self-center">
            {safeguards.map((item) => (
              <div
                key={item}
                className="card-lift flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.1] px-4 py-3 text-sm font-semibold text-white"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#27d6c3]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
