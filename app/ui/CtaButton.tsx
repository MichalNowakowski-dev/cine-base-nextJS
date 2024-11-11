import { FaPlay } from "react-icons/fa";
export default function CtaButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`flex gap-x-1 items-center justify-center bg-primary hover:bg-red-800 text-white rounded-md py-2 px-4 ${className}`}
    >
      <FaPlay />
      {children}
    </button>
  );
}
