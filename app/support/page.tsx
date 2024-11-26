import { fetchTrendingList } from "../lib/data";
import { getImgUrl } from "../lib/utils";
import Image from "next/image";
import { MediaItem, PosterSize } from "../lib/types";
import SupportForm from "./SupportForm";
import AccordionList from "../components/faqList/FaqList";
import FreeTrialCta from "../components/ui/freeTrialCta/FreeTrialCta";
import PageContainer from "../components/ui/pageContainer/PageContainer";

export default async function Page() {
  const data = await fetchTrendingList("movie", "day", 1);
  const posters = data.results.map((movie: MediaItem) => movie.poster_path);
  return (
    <PageContainer className=" flex flex-col gap-10 md:gap-x-5 lg:gap-12 md:flex-row flex-wrap justify-between ">
      <div className="flex flex-col gap-8 mx-auto md:basis-[35%] ">
        <header>
          <h2 className="mb-3 text-h2 ">Wsparcie CineBase</h2>
          <p className="text-sm text-secondary">
            Masz pytania? Mamy odpowiedzi! Sprawdź naszą sekcję FAQ, aby znaleźć
            odpowiedzi na najczęstsze pytania dotyczące CineBase.
          </p>
        </header>
        <div className="relative w-full overflow-hidden rounded-lg border-8 border-borderPrimary max-w-md mx-auto">
          <ul className="grid grid-cols-4 gap-4 ">
            {posters.slice(0, 16).map((path: string, index: number) => (
              <li
                key={path}
                className={`relative ${
                  index < 4 || index >= 12 ? "opacity-50" : ""
                }`}
              >
                <Image
                  width={185}
                  height={314}
                  quality={100}
                  alt="poster image"
                  src={getImgUrl(PosterSize.MEDIUM, path)}
                  className="object-cover rounded-lg w-[98px] aspect-[2/3]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SupportForm />
      <AccordionList />
      <FreeTrialCta />
    </PageContainer>
  );
}
