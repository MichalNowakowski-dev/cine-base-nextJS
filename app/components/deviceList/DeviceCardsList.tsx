import { FaGamepad, FaLaptop, FaMobile, FaTablet, FaTv } from "react-icons/fa6";
import Card from "../ui/card/Card";
import { DeviceCardType } from "@/app/types/types";
import { BsHeadsetVr } from "react-icons/bs";

const devicesData: DeviceCardType[] = [
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

export default function DeviceList() {
  return (
    <ul className="flex flex-wrap gap-4 justify-between items-center">
      {devicesData.map(({ name, desc, Icon }) => (
        <Card key={name} name={name} Icon={Icon}>
          {desc}
        </Card>
      ))}
    </ul>
  );
}
