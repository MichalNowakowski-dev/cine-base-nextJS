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
import FreeTrialCta from "@/app/components/ui/freeTrialCta/FreeTrialCta";
import { MediaPerson, ProfileSize } from "@/app/types/types";
import PageContainer from "@/app/components/ui/pageContainer/PageContainer";
import SwiperList from "@/app/components/Swiper/SwiperList";
import BackdropList from "@/app/components/backdropsList/BackdropList";

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

  console.log(personImages.profiles);

  return (
    <PageContainer>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        <div className={`${styles.headerSection} p-7 rounded-md`}>
          {personDetails.backdrop_path ? (
            <Image
              className="absolute object-cover top-0 left-0 rounded-md -z-10 h-full"
              alt="movie image"
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${ProfileSize.LARGE}${personDetails.profile_path}`}
              priority
              width={635}
              height={953}
              quality={100}
            />
          ) : (
            <Image
              className="absolute top-0 left-0 rounded-md -z-10 h-full"
              alt="movie image"
              src={"/no-profile-img.png"}
              priority
              width={635}
              height={953}
            />
          )}
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
        <div className="p-7 bg-backgroundLight rounded-md col-span-full">
          <section className="mb-5">
            <p className="text-secondary flex gap-1 items-center mb-3">
              {" "}
              <CiCalendar size={20} /> Wiek i miejsce urodzenia
            </p>
            {personDetails.birthday ? (
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
            ) : (
              <p>Brak informacji</p>
            )}
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
          {personCredits.cast.length > 1 && (
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
          )}
          {personCredits.crew.length > 1 && (
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
          )}
        </div>
        <div className="p-7 bg-backgroundLight rounded-md lg:col-start-3 border border-borderPrimary">
          <h3 className="text-secondary mb-4">Zdjęcia</h3>
          {personImages.profiles.length > 0 ? (
            <BackdropList list={personImages.profiles} />
          ) : (
            <p>Brak zdjęć</p>
          )}
        </div>
      </section>
      <section className="mb-20">
        <FreeTrialCta />
      </section>
    </PageContainer>
  );
}
