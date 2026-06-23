const steps = [
  {
    title: "Choose a supported path",
    copy: "Start with the route, payment option, or payout method available for the user's region.",
  },
  {
    title: "Review the details",
    copy: "Confirm the amount, timing, recipient information, and any required verification before moving forward.",
  },
  {
    title: "Complete with support nearby",
    copy: "Finish the flow with clear status updates and a support path when a question comes up.",
  },
];

const safeguards = [
  "Verification steps for supported workflows",
  "Clear transaction review before completion",
  "Privacy-conscious product decisions",
  "Support paths for user questions",
];

export default function HowItWorks() {
  return (
    <>
      <section
        id="how-it-works"
        className="px-4 py-16 sm:px-6 lg:py-24"
        aria-labelledby="how-title"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">
              How it works
            </p>
            <h2
              id="how-title"
              className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl"
            >
              A calm flow for important transfers.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              EasyCoin keeps the public promise simple: help people understand
              the path, review what matters, and complete the next step with
              confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_48px_rgba(15,23,42,0.05)] sm:grid-cols-[64px_1fr] sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f0fff7] text-base font-semibold text-emerald-600">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="security"
        className="px-4 py-16 sm:px-6 lg:py-24"
        aria-labelledby="security-title"
      >
        <div className="mx-auto grid max-w-6xl gap-8 rounded-lg border border-emerald-500/15 bg-white p-6 shadow-[0_26px_80px_rgba(15,23,42,0.07)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Responsible design
            </p>
            <h2
              id="security-title"
              className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl"
            >
              Built around review, verification, and support.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              The product direction is designed with verification, transaction
              review, and responsible workflows in mind. Availability of
              features may vary by region and supported partners.
            </p>
          </div>

          <div className="grid gap-3 self-center">
            {safeguards.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-md border border-emerald-500/12 bg-[#f5fffa] px-4 py-3 text-sm font-medium text-slate-700"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
