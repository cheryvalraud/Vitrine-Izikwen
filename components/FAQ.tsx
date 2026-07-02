const faqs = [
  {
    question: "Is Izikwen a bank?",
    answer:
      "Izikwen is a private digital asset platform that applies private banking discipline to custody and transfers. It is not a traditional deposit-taking bank.",
  },
  {
    question: "Which assets does Izikwen support?",
    answer:
      "Izikwen currently supports Bitcoin (BTC), Ethereum (ETH), and USDT. New assets are added deliberately after review.",
  },
  {
    question: "How is custody handled?",
    answer:
      "Reserve holdings are kept in cold storage, and transfers require multi-signature approval before they settle.",
  },
  {
    question: "What happens if I need help?",
    answer:
      "Support requests go directly to the Izikwen team through contact@izikwen.com, with a real person reviewing sensitive transfers.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "A dedicated app is in progress. Until then, Izikwen is accessible from any modern browser on desktop or mobile.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="px-4 py-16 sm:px-6 lg:py-24"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-[358px] sm:max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a19]">
          FAQ
        </p>
        <h2
          id="faq-title"
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[#07111f] sm:text-4xl"
        >
          Questions worth answering clearly.
        </h2>

        <div className="mt-9 grid gap-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-[#d8d0c2] bg-white px-5 py-4 shadow-[0_10px_36px_rgba(7,17,31,0.04)] transition open:shadow-[0_16px_48px_rgba(7,17,31,0.07)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#07111f] marker:content-none">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6f2ea] text-[#7a5a19] transition group-open:rotate-45 group-open:bg-[#07111f] group-open:text-[#f4d187]">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#52606d]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
