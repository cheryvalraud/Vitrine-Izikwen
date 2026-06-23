import Image from "next/image";

const storeLinks = ["Google Play - coming soon", "App Store - coming soon"];

export default function Footer() {
  return (
    <footer id="support" className="px-4 pb-8 pt-14 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
                <Image
                  src="/images/izikwen-logo-mark.png"
                  alt=""
                  width={36}
                  height={20}
                  className="h-auto w-8"
                />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-[0.14em]">
                  IZIKWEN
                </p>
                <p className="text-sm text-slate-300">EasyCoin</p>
              </div>
            </div>

            <h2 className="mt-8 max-w-2xl text-3xl font-semibold tracking-normal sm:text-4xl">
              Digital value, made easier to access.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              Availability of features may vary by region. Services are subject
              to compliance review and supported payment partners.
            </p>
          </div>

          <div className="grid gap-3 sm:min-w-[260px]">
            {storeLinks.map((label) => (
              <a
                key={label}
                href="mailto:support@example.com?subject=Izikwen%20EasyCoin"
                className="rounded-md border border-white/14 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                {label}
              </a>
            ))}
            <a
              href="mailto:support@example.com?subject=Izikwen%20EasyCoin%20support"
              className="rounded-md bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Contact support
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Izikwen / EasyCoin.</p>
          <p>Support placeholder: support@example.com</p>
        </div>
      </div>
    </footer>
  );
}
