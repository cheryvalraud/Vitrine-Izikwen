import Image from "next/image";

const navItems = [
  { label: "How it works", href: "#flow" },
  { label: "Security", href: "#trust" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ded6c7] bg-[#f6f2ea]/95 shadow-[0_8px_30px_rgba(7,17,31,0.06)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 text-[#07111f] sm:px-6">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-3"
          aria-label="Izikwen home"
        >
          <Image
            src="/images/izikwen-logo-mark.png"
            alt="Izikwen"
            width={44}
            height={24}
            priority
            className="h-auto w-11 shrink-0"
          />
          <span className="min-w-0 leading-none">
            <span className="block text-sm font-semibold tracking-[0.16em]">
              IZIKWEN
            </span>
            <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#6c5a42]">
              EasyCoin
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#52606d] transition hover:text-[#07111f]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:contact@comercializikwen.com?subject=Izikwen%20support"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-[#cfc5b5] bg-white px-4 text-sm font-semibold text-[#07111f] shadow-[0_8px_24px_rgba(7,17,31,0.08)] transition hover:-translate-y-0.5 hover:border-[#bba98f] hover:bg-[#fffaf0]"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
