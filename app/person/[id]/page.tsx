import {
  fetchPersonById,
  fetchPersonCredits,
  fetchPersonImages,
} from "@/app/lib/api/tmdbApi";

import Image from "next/image";

import { CiCalendar } from "react-icons/ci";
import { GiHastyGrave } from "react-icons/gi";
import { calculateAge } from "@/app/lib/utils";
import { v4 as uuid } from "uuid";
import ImageModal from "@/app/components/imageModal/ImageModal";
import FreeTrialCta from "@/app/components/ui/freeTrialCta/FreeTrialCta";
import { MediaPerson, ProfileSize } from "@/app/types/types";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import SwiperList from "@/app/components/Swiper/SwiperList";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const personDetails = await fetchPersonById(Number(id));
  const personCredits = await fetchPersonCredits(Number(id));
  const personImages = await fetchPersonImages(Number(id));

  console.log(removeNoProfilePerson(personCredits.cast));

  const styles = {
    headerSection:
      "flex flex-col justify-end items-center gap-y-4 h-[70vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_100%),_linear-gradient(to_top,_#141414_0%,_transparent_50%)] mb-6",
  };

  function removeNoProfilePerson(list: MediaPerson[]) {
    const filteredList = list.filter((item) => item.profile_path);
    return filteredList;
  }

  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        <div className={`${styles.headerSection} p-7 rounded-md`}>
          <Image
            className="absolute object-cover top-0 left-0 rounded-md -z-10 h-full"
            alt="movie image"
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${ProfileSize.XLARGE}${personDetails.profile_path}`}
            width={635}
            height={953}
            quality={100}
          />
          <header className="z-10 text-center">
            <h1>{personDetails.name}</h1>
          </header>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-2 md:col-start-2">
          <h3 className="text-secondary mb-3">Biografia</h3>
          <p className="text-white tracking-wider leading-7">
            {personDetails.biography
              ? personDetails.biography
              : "--- Brak biografii ---"}
          </p>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md ">
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <CiCalendar size={20} /> Wiek i miejsce urodzenia
            </p>
            <div className="flex flex-col gap-2">
              <span>
                {personDetails.deathday
                  ? ` Zmarł w wieku: ${
                      personDetails.deathday.slice(0, 4) -
                      personDetails.birthday.slice(0, 4)
                    } lat`
                  : `${calculateAge(
                      personDetails.birthday.slice(0, 4)
                    )} lat/lata`}
              </span>

              <span>{personDetails.place_of_birth}</span>
            </div>
          </section>
          {personDetails.deathday && (
            <section className="mb-5">
              <p className="text-secondary flex gap-1 items-center mb-3">
                {" "}
                <GiHastyGrave size={20} /> Data śmierci
              </p>
              <span>{personDetails.deathday}</span>
            </section>
          )}
        </div>
        <div className="overflow-hidden p-7 bg-backgroundLight rounded-md md:col-span-2">
          <section className="mb-5">
            <SwiperList
              mediaList={personCredits.cast.slice(0, 30)}
              listLabel={
                personDetails.gender === 2
                  ? "Znany z filmów/seriali"
                  : "Znana z filmów/seriali"
              }
              swiperId={uuid()}
            ></SwiperList>
          </section>
          <section className="mb-5">
            <SwiperList
              mediaList={personCredits.crew.slice(0, 30)}
              swiperId={uuid()}
              listLabel={
                personDetails.gender === 2
                  ? "Brał udział w produkcji"
                  : "Brała udział w produkcji"
              }
            ></SwiperList>
          </section>
        </div>
        <div className="p-7 bg-backgroundLight rounded-md md:col-span-full border border-borderPrimary">
          <h3 className="text-secondary mb-4">Zdjęcia</h3>
          <ul className="flex flex-wrap gap-2">
            {personImages.profiles
              .slice(0, 16)
              .map(
                (img: { file_path: string; height: number; width: number }) => (
                  <li className=" hover:cursor-pointer" key={uuid()}>
                    <ImageModal
                      altText="backdrop image"
                      imageUrl={`${process.env.NEXT_PUBLIC_IMAGES_URL}${ProfileSize.XLARGE}${img.file_path}`}
                      height={img.height}
                      width={img.width}
                    />
                  </li>
                )
              )}
          </ul>
        </div>
      </section>
      <section className="mb-20">
        <FreeTrialCta />
      </section>
    </PageContainer>
  );
}
