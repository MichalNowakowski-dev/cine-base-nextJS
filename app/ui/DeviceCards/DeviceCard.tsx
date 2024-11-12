import { IconType } from "react-icons";

export default function DeviceCard({
  Icon,
  name,
  desc,
}: {
  Icon: IconType;
  name: string;
  desc: string;
}) {
  return (
    <li className="p-4 border border-[#999999] rounded-md bg-fade-black-to-red md:basis-[30%] min-h-[170px]">
      <header className="mb-4 flex gap-2 items-center">
        <div className="p-2 flex items-center justify-center bg-background rounded-md">
          <Icon size={20} color="red" />
        </div>
        <h3>{name}</h3>
      </header>
      <p className="text-[#999999] text-sm">{desc}</p>
    </li>
  );
}
