import Image from "next/image";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-lg border border-emerald-500/15 bg-white/82 px-3 py-3 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-4">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-3"
          aria-label="Izikwen EasyCoin home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-950">
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
            <span className="block text-sm font-semibold tracking-[0.12em] text-slate-950">
              IZIKWEN
            </span>
            <span className="block text-xs font-medium text-slate-500">
              EasyCoin
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:support@example.com?subject=Izikwen%20EasyCoin%20waitlist"
          className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
