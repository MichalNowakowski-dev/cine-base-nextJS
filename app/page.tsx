import Image from "next/image";
import HeaderImgDesktop from "@/public/HeroOriginal.jpg";
import { Suspense } from "react";
import { MediaContainerSkeleton } from "./ui/skeletons";
import MediaListContainer from "./ui/MediaListCarousel/MediaListContainer";
import CtaButton from "./ui/CtaButton";
import Link from "next/link";
import GenresCardsSectionContainer from "./ui/GenresCards/GenresCardsContainer";
import DeviceCardsList from "./ui/DeviceCards/DeviceCardsList";
import Accordion from "./ui/Accordion";

const accordionData = [
  {
    question: "Czym jest CineBase?",
    answer:
      "CineBase to usługa przesyłania strumieniowego umożliwiająca oglądanie filmów i programów na żądanie. Możesz również dowiedzieć się paru cennych informacjii o filmach czy serialach.",
  },
  {
    question: "Ile kosztuje korzystanie z CineBase?",
    answer:
      "CineBase jest darmowy do przeglądania i eksplorowania informacji o filmach. Jednak niektóre zaawansowane funkcje mogą wymagać subskrypcji lub dodatkowych opłat w przyszłości.",
  },
  {
    question: "Co oferuje CineBase?",
    answer:
      "CineBase oferuje ogromną bibliotekę filmów, programów telewizyjnych, dokumentów i ekskluzywnych treści z różnych gatunków, dostępnych na żądanie.",
  },
  {
    question: "Gdzie mogę oglądać CineBase?",
    answer:
      "Możesz oglądać CineBase na różnych urządzeniach, w tym smartfonach, tabletach, telewizorach smart TV i komputerach. Po prostu pobierz aplikację lub odwiedź naszą stronę internetową, aby rozpocząć przesyłanie strumieniowe.",
  },
  {
    question: "Jak się zarejestrować w CineBase?",
    answer:
      "Rejestracja w CineBase jest prosta. Wystarczy odwiedzić naszą stronę internetową, kliknąć przycisk „Zarejestruj się” i postępować zgodnie z instrukcjami, aby utworzyć konto.",
  },
  {
    question: "Co oznacza okres próbny?",
    answer:
      "CineBase oferuje nowym użytkownikom bezpłatny okres próbny, umożliwiający zapoznanie się z platformą i jej treścią przed podjęciem decyzji o wykupieniu subskrypcji.",
  },
];

export default async function Home() {
  return (
    <>
      <header className="h-[70vh] w-full relative flex flex-col items-center justify-center mb-5 after:content-[''] after:absolute after:inset-0 after:bg-fade-to-dark">
        <Image
          className=" object-cover h-full absolute top-0 left-0 -z-10"
          src={HeaderImgDesktop}
          alt="Hero image"
        />
        <section className="flex items-end h-full pb-20">
          <div className="text-center z-10 flex flex-col justify-center items-center gap-4">
            <h1>CineBase</h1>
            <p className="text-sm text-secondary w-2/3">
              CineBase to najlepsze doświadczenie streamingowe do oglądania
              ulubionych filmów i programów na żądanie, w dowolnym czasie i
              miejscu. Dzięki CineBase możesz cieszyć się szeroką gamą treści, w
              tym najnowszymi hitami, klasycznymi filmami, popularnymi serialami
              i nie tylko. Możesz również tworzyć własne listy obserwowanych,
              dzięki czemu łatwo znajdziesz treści, które chcesz obejrzeć.
            </p>
            <Link href={"/sign-in"}>
              <CtaButton>Zacznij oglądać</CtaButton>
            </Link>
          </div>
        </section>
      </header>
      <main className=" xl:max-w-screen-xl mx-auto flex flex-col gap-16">
        <section className="flex flex-wrap gap-6 px-4">
          <GenresCardsSectionContainer />
        </section>

        <section className="px-4">
          <header className="mb-6">
            <h2 className="mb-4 text-2xl">
              Zapewniamy możliwość przesyłania strumieniowego na różnych
              urządzeniach
            </h2>
            <p className="text-secondary text-sm">
              Dzięki CineBase możesz oglądać swoje ulubione filmy i programy
              telewizyjne zawsze i wszędzie.{" "}
              <span className=" hidden md:inline">
                Nasza platforma jest zaprojektowana tak, aby była kompatybilna z
                szeroką gamą urządzeń, zapewniając, że nigdy nie przegapisz
                chwili rozrywki.
              </span>
            </p>
          </header>
          <DeviceCardsList />
        </section>

        <section className="px-4 ">
          <div className="flex flex-wrap gap-3 justify-between items-center mb-8">
            <header>
              <h2 className="mb-3 text-h2 ">Często zadawane pytania</h2>
              <p className="text-sm text-secondary">
                Masz pytania? Mamy odpowiedzi! Sprawdź naszą sekcję FAQ, aby
                znaleźć odpowiedzi na najczęstsze pytania dotyczące CineBase.
              </p>
            </header>
            <CtaButton>Zadaj pytanie</CtaButton>
          </div>
          <ul className="md:flex justify-between md:flex-wrap">
            {accordionData.map(({ question, answer }, i) => (
              <Accordion
                key={question}
                number={"0" + (i + 1)}
                question={question}
                answer={answer}
              />
            ))}
          </ul>
        </section>

        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="top_rated"
              label="Najlepiej oceniane"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="popular"
              label="Popularne"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              mediaCategory="trending"
              timeWindow="week"
              label="Tygodniowe trendy"
              switchNames={["Filmy", "Seriale"]}
            />
          </Suspense>
        </section>
        <section className="px-4">
          <Suspense fallback={<MediaContainerSkeleton />}>
            <MediaListContainer
              movieCategories={["now_playing", "upcoming"]}
              label="W kinach"
              switchNames={["Teraz", "Wkrótce"]}
            />
          </Suspense>
        </section>
      </main>
    </>
  );
}
