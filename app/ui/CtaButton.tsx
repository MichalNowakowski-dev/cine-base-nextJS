import { FaPlay } from "react-icons/fa";
export default function CtaButton({
  className,
  children,
  play = false,
}: {
  play?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`flex gap-x-1 items-center justify-center bg-primary hover:bg-red-800 text-white rounded-md py-3 px-4 ${className}`}
    >
      {play && <FaPlay />}
      {children}
    </button>
  );
}
