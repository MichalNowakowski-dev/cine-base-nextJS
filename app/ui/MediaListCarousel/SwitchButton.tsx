type SwitchButtonProps = {
  switchCategory: string;
  handleSwitch: () => void;
  activeCategory: string;
  children: React.ReactNode;
};

export default function SwitchButton({
  children,
  switchCategory,
  handleSwitch,
  activeCategory,
}: SwitchButtonProps) {
  return (
    <button
      onClick={handleSwitch}
      className={`py-2 px-4 flex justify-center items-center font-semibold w-1/2 border-none rounded-full whitespace-nowrap transition-all duration-300 ease-linear ${
        activeCategory === switchCategory
          ? "bg-fade-black-to-red"
          : "bg-transparent"
      } ${activeCategory === switchCategory ? "text-white" : "text-black"}`}
    >
      {children}
    </button>
  );
}
