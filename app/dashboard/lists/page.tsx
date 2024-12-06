import { prisma } from "@/app/prisma";
import MediaList from "../components/MediaList";
import { auth } from "@/app/auth";

const Lists = async () => {
  const session = await auth();
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

  async function getFavoriteMovies() {
    const movieIds = userInfo?.favoriteMovies.map((item) => item.movieId);

    const movies = await prisma.movie.findMany({
      where: {
        id: {
          in: movieIds,
        },
      },
    });

    return movies;
  }
  async function getFavoriteShows() {
    const showIds = userInfo?.favoriteShows.map((item) => item.showId);

    const shows = await prisma.show.findMany({
      where: {
        id: {
          in: showIds,
        },
      },
    });

    return shows;
  }
  async function getToWatchMovies() {
    const movieIds = userInfo?.toWatchMovies.map((item) => item.movieId);

    const movies = await prisma.movie.findMany({
      where: {
        id: {
          in: movieIds,
        },
      },
    });

    return movies;
  }
  async function getToWatchShows() {
    const showIds = userInfo?.toWatchShows.map((item) => item.showId);

    const shows = await prisma.show.findMany({
      where: {
        id: {
          in: showIds,
        },
      },
    });

    return shows;
  }

  const getLists = async () => {
    try {
      return await Promise.all([
        getFavoriteMovies(),
        getFavoriteShows(),
        getToWatchMovies(),
        getToWatchShows(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [
    favoriteMovies = [],
    favoriteShows = [],
    toWatchMovies = [],
    toWatchShows = [],
  ] = (await getLists()) || [];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Moje listy
      </h2>

      {/* Ulubione Filmy */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
          Ulubione filmy
        </h3>
        {favoriteMovies.length > 0 ? (
          <MediaList
            listType="favorites"
            userId={userId}
            mediaType="movie"
            mediaList={favoriteMovies}
          />
        ) : (
          <h4>~~ Brak ulubionych filmów ~~</h4>
        )}
      </section>

      {/* Ulubione Seriale */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
          Ulubione seriale
        </h3>
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
      </section>

      {/* Filmy do obejrzenia */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
          Filmy do obejrzenia
        </h3>
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
      </section>

      {/* Seriale do obejrzenia */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
          Seriale do obejrzenia
        </h3>
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
      </section>
    </div>
  );
};

export default Lists;
