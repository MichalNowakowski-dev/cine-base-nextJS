import Link from "next/link";
import { FaPlay } from "react-icons/fa";
export default function CtaLink({
  href,
  className,
  children,
  play = false,
}: {
  href: string;
  play?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex gap-x-1 items-center justify-center bg-primary hover:bg-red-800 text-white rounded-md py-3 px-4 ${className}`}
    >
      {play && <FaPlay />}
      {children}
    </Link>
  );
}
