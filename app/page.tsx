import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroOriginal.jpg";
import Search from "./ui/Search";

export default function Home() {
  return (
    <main>
      <header className="h-[50vh] w-screen absolute top-0">
        <div className="absolute top-0, left-0 h-full w-full bg-fade-to-dark"></div>
        <Image
          src={HeaderImgDesktop}
          alt="Hero image"
          style={{ objectFit: "cover", height: "100%" }}
        />
        <section className="flex flex-col gap-y-10 items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
          <div className="text-center">
            <h1>CineBase</h1>
            <p>Odkryj świat filmu w jednym miejscu!</p>
          </div>
          <Search placeholder="Wpisz szukaną frazę..." />
        </section>
      </header>
      <section className="px-4"></section>
    </main>
  );
}
