import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="CooprStudio">
      <Image
        src="/images/logo-cooprstudio.jpg"
        alt="CooprStudio"
        width={960}
        height={320}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
