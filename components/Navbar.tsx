import Image from "next/image";

const navItems = [
  { label: "Rails", href: "#rails" },
  { label: "Flow", href: "#flow" },
  { label: "Trust", href: "#trust" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="nav-ledger mx-auto grid w-full max-w-[358px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[8px] border border-white/12 bg-[#07111f]/88 px-3 py-3 text-white shadow-[0_22px_70px_rgba(7,17,31,0.22)] backdrop-blur-2xl sm:max-w-6xl md:grid-cols-[1fr_auto_1fr] md:px-4">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-3"
          aria-label="Izikwen home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-white">
            <Image
              src="/images/izikwen-logo-mark.png"
              alt=""
              width={34}
              height={19}
              priority
              className="h-auto w-7"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold tracking-[0.18em] text-white">
              IZIKWEN
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#9fb3c8]">
              Payment rails
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-[8px] border border-white/10 bg-white/[0.04] p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[6px] px-3 py-2 text-sm font-medium text-[#c9d4df] transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex justify-end">
          <a
            href="mailto:support@example.com?subject=Izikwen%20private%20preview"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[8px] bg-[#f4d187] px-3 text-sm font-semibold text-[#07111f] shadow-[0_10px_30px_rgba(244,209,135,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffe1a3] sm:px-4"
          >
            <span className="signal-dot h-2 w-2 rounded-full bg-[#07111f]" />
            <span className="hidden sm:inline">Preview</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
