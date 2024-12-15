import React from "react";
import Image from "next/image";
import { styles } from "@/app/styles";
import { BackdropSize, MediaItem } from "@/app/types/types";
import CtaLink from "../ui/ctaLink/CtaLink";
import RateMediaButton from "../ui/rateMediaBtn/RateMediaButton";
import AddToWatchlistButton from "../ui/addToWatchBtn/AddToWatchlistButton";
import FavoriteButton from "../ui/addToFavBtn/AddToFavoriteBtn";
import { auth } from "@/app/auth";
import { getUserMediaStatus } from "@/app/lib/actions/media/mediaActions";

export default async function MediaDetailsHeaderSection({
  mediaDetails,
  mediaType,
}: {
  mediaDetails: MediaItem;
  mediaType: "movie" | "tv";
}) {
  const session = await auth();
  const { favoriteStatus, watchlistStatus, ratingStatus } =
    await getUserMediaStatus(
      mediaDetails.id,
      Number(session?.user?.id),
      mediaType
    );

  const isMovie = mediaType === "movie";
  return (
    <header className={styles.headerSection}>
      {mediaDetails.backdrop_path ? (
        <Image
          className="absolute object-cover top-0 left-0 rounded-md -z-10 h-full"
          alt="movie image"
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${BackdropSize.LARGE}${mediaDetails.backdrop_path}`}
          priority
          width={1280}
          height={720}
          quality={100}
        />
      ) : (
        <Image
          className="absolute aspect-video top-0 left-0 rounded-md -z-10 h-full"
          alt="movie image"
          src={"/backgroundPlaceholder.webp"}
          priority
          width={1280}
          height={720}
          quality={100}
        />
      )}
      <header className="z-10">
        <h1 className="text-center">
          {isMovie ? mediaDetails.title : mediaDetails.name}
        </h1>
        <p className=" text-secondary ">{mediaDetails.tagline}</p>
      </header>
      <div className="z-10 mb-14 flex flex-col lg:flex-row gap-3 ">
        <CtaLink href={`/mediaPlay?seriesId=${mediaDetails.id}`} play>
          Oglądaj
        </CtaLink>
        <div className="flex gap-x-3">
          <RateMediaButton
            isRated={Boolean(ratingStatus)}
            mediaData={mediaDetails}
            mediaType="tv"
            rating={ratingStatus as number}
            userId={Number(session?.user.id)}
          />
          <AddToWatchlistButton
            isInWatchlist={watchlistStatus}
            mediaData={mediaDetails}
            mediaType="tv"
            userId={Number(session?.user.id)}
          />
          <FavoriteButton
            isFavorite={favoriteStatus}
            userId={Number(session?.user.id)}
            mediaData={mediaDetails}
            mediaType="tv"
          />
        </div>
      </div>
    </header>
  );
}
