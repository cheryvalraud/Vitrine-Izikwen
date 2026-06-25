import Image from "next/image";

const navItems = [
  { label: "How it works", href: "#flow" },
  { label: "Security", href: "#trust" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 text-white sm:px-6">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-3"
          aria-label="Izikwen home"
        >
          <Image
            src="/images/izikwen-logo-mark.png"
            alt="Izikwen"
            width={46}
            height={26}
            priority
            className="h-auto w-11 shrink-0"
          />
          <span className="min-w-0 leading-none">
            <span className="block text-sm font-semibold tracking-[0.16em] text-white">
              IZIKWEN
            </span>
            <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#d7c49a]">
              EasyCoin
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#c7d2df] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:contact@izikwen.com?subject=Izikwen%20support"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
