import Image from "next/image";

const storeLinks = ["Google Play - coming soon", "App Store - coming soon"];

export default function Footer() {
  return (
    <footer id="support" className="bg-[#07111f] px-4 pb-8 pt-6 text-white sm:px-6">
      <div className="mx-auto max-w-[358px] rounded-3xl border border-white/12 bg-white/[0.08] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:max-w-6xl sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/izikwen-logo-mark.png"
                alt="Izikwen"
                width={42}
                height={24}
                className="h-auto w-11"
              />
              <div>
                <p className="text-sm font-semibold tracking-[0.14em] text-white">
                  IZIKWEN
                </p>
              </div>
            </div>

            <h2 className="mt-8 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
              Support that reaches Izikwen directly.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#eef3f8]">
              Questions about IZIKWEN payments can be sent to the support inbox.
              Availability of features may vary by region and supported payment
              partners.
            </p>
          </div>

          <div className="grid gap-3 sm:min-w-[270px]">
            {storeLinks.map((label) => (
              <a
                key={label}
                href="mailto:contact@izikwen.com?subject=Izikwen%20app%20updates"
                className="rounded-full border border-white/16 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/14"
              >
                {label}
              </a>
            ))}
            <a
              href="mailto:contact@izikwen.com?subject=Izikwen%20support"
              className="rounded-full bg-[#f4d187] px-4 py-3 text-center text-sm font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-[#ffe1a3]"
            >
              Contact support
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-5 text-xs text-[#d9e3ee] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Izikwen.</p>
          <p>contact@izikwen.com</p>
        </div>
      </div>
    </footer>
  );
}
