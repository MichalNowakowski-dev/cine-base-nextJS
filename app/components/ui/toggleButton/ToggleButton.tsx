"use client";

interface ToggleButtonProps {
  isChecked: boolean;
  onToggle: (newState: boolean) => void;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isChecked,
  onToggle,
  className = "",
}) => {
  return (
    <button
      onClick={() => onToggle(!isChecked)}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
        isChecked ? "bg-lime-900" : "bg-neutral-400"
      } ${className}`}
    >
      <div
        className={`pointer-events-none block h-5 w-5 rounded-full ${
          isChecked ? "bg-background" : "bg-slate-600"
        } shadow-lg ring-0 transition-transform ${
          isChecked ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;
