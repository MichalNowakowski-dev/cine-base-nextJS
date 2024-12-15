import { prisma } from "@/app/prisma";
import MediaList from "../components/MediaList";
import { auth } from "@/app/auth";
import { getUserLists } from "@/app/lib/actions/media/mediaActions";
import Accordion from "@/app/components/ui/accordion/Accordion";
import { redirect } from "next/navigation";

const Lists = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  const userId = Number(session?.user.id);
  const userInfo = await prisma.user.findUnique({
    where: {
      id: Number(session?.user.id),
    },
    include: {
      favoriteMovies: {
        where: {
          userId: Number(session?.user.id),
        },
      },
      favoriteShows: {
        where: {
          userId: Number(session?.user.id),
        },
      },
      toWatchMovies: {
        where: {
          userId: Number(session?.user.id),
        },
      },
      toWatchShows: {
        where: {
          userId: Number(session?.user.id),
        },
      },
    },
  });

  const userLists = {
    favoriteMovies: userInfo?.favoriteMovies,
    favoriteShows: userInfo?.favoriteShows,
    toWatchMovies: userInfo?.toWatchMovies,
    toWatchShows: userInfo?.toWatchShows,
  };

  const [
    favoriteMovies = [],
    favoriteShows = [],
    toWatchMovies = [],
    toWatchShows = [],
  ] = (await getUserLists(userLists)) || [];

  return (
    <div className="p-0 sm:p-6  text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Moje listy
      </h2>
      <section className="mb-12">
        <Accordion
          number={String(favoriteMovies.length) || "0"}
          title="Ulubione filmy"
        >
          {favoriteMovies.length > 0 ? (
            <MediaList
              listType="favorites"
              userId={userId}
              mediaType="movie"
              mediaList={favoriteMovies}
            />
          ) : (
            <p>~~ Brak ulubionych filmów ~~</p>
          )}
        </Accordion>
      </section>
      <section className="mb-12">
        <Accordion
          number={String(favoriteShows.length) || "0"}
          title="Ulubione seriale"
        >
          {favoriteShows.length > 0 ? (
            <MediaList
              listType="favorites"
              userId={userId}
              mediaType="tv"
              mediaList={favoriteShows}
            />
          ) : (
            <h4>~~ Brak ulubionych seriali ~~</h4>
          )}
        </Accordion>
      </section>
      <section className="mb-12">
        <Accordion
          number={String(toWatchMovies.length) || "0"}
          title="Filmy, które chce obejrzeć"
        >
          {toWatchMovies.length > 0 ? (
            <MediaList
              listType="toWatch"
              userId={userId}
              mediaType="movie"
              mediaList={toWatchMovies}
            />
          ) : (
            <h4>~~ Brak filmów do obejrzenia ~~</h4>
          )}
        </Accordion>
      </section>
      <section className="mb-12">
        <Accordion
          number={String(toWatchShows.length) || "0"}
          title="Seriale, które chce obejrzeć"
        >
          {toWatchShows.length > 0 ? (
            <MediaList
              listType="toWatch"
              userId={userId}
              mediaType="tv"
              mediaList={toWatchShows}
            />
          ) : (
            <h4>~~ Brak seriali do obejrzenia ~~</h4>
          )}
        </Accordion>
      </section>
    </div>
  );
};

export default Lists;
