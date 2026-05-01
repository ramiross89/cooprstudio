import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-[1.08rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.28rem]"
      style={{ fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif" }}
      aria-label="CooprStudio"
    >
      CooprStudio<span className="text-accent">.</span>
    </Link>
  );
}
