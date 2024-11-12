import { FaGamepad, FaLaptop, FaMobile, FaTablet, FaTv } from "react-icons/fa6";
import DeviceCard from "./DeviceCard";
import { DeviceCardType } from "@/app/lib/types";
import { BsHeadsetVr } from "react-icons/bs";

const DeviceCardsArray: DeviceCardType[] = [
  {
    name: "Smartfony",
    desc: "CineBase jest zoptymalizowany dla smartfonów z systemami Android i iOS, zapewniając płynne oglądanie filmów i seriali na mniejszych ekranach",
    Icon: FaMobile,
  },
  {
    name: "Laptopy",
    desc: "CineBase działa na laptopach z systemami Windows, oferując pełną funkcjonalność na komputerach. Oglądaj swoje ulubione filmy i seriale w najwyższej jakości",
    Icon: FaLaptop,
  },
  {
    name: "Tablety",
    desc: "CineBase jest zoptymalizowany dla tabletów z systemami Android i iOS. Oglądaj filmy i seriale na większym ekranie, ciesząc się płynnością działania",
    Icon: FaTablet,
  },
  {
    name: "Smart TV",
    desc: "CineBase jest dostępny na Smart TV z systemami Android TV, pozwalając na oglądanie treści na dużym ekranie. Ciesz się filmami i serialami w jakości HD",
    Icon: FaTv,
  },
  {
    name: "Konsole",
    desc: "CineBase jest dostępny na konsolach PlayStation i Xbox, umożliwiając wygodne oglądanie treści na ekranie aktualnie podpiętym do konsoli",
    Icon: FaGamepad,
  },
  {
    name: "VR",
    desc: "CineBase oferuje możliwość oglądania filmów w wirtualnej rzeczywistości za pomocą gogli VR. Ciesz się immersyjnymi doświadczeniami już dziś!",
    Icon: BsHeadsetVr,
  },
];

export default function DeviceCardsList() {
  return (
    <ul className="flex flex-wrap gap-4 justify-between items-center">
      {DeviceCardsArray.map(({ name, desc, Icon }) => (
        <DeviceCard key={name} name={name} Icon={Icon} desc={desc} />
      ))}
    </ul>
  );
}
