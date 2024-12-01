import ProfileCard from "./components/ProfileCard";
import FavoritesGrid from "./components/FavoritesGrid";
import WatchlistGrid from "./components/WatchListGrid";
import Recommendations from "./components/Recommendations";
import Stats from "./components/Stats";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import UpdateSession from "../components/updateSession/UpdateSession";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const user = {
    firstName: "Michał",
    avatarUrl: "/path_to_avatar.jpg",
  };

  const favoriteMovies = [
    {
      id: 1,
      title: "Inception",
      posterPath: "/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight",
      posterPath: "/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg",
    },
  ];

  const watchlist = [
    {
      id: 1,
      title: "Interstellar",
      posterPath: "/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg",
    },
    { id: 2, title: "Dune", posterPath: "/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg" },
  ];

  const recommendations = [
    { id: 1, title: "Avatar", posterPath: "/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg" },
    {
      id: 2,
      title: "Guardians",
      posterPath: "/sBnhJ4f5KAzg6C3FwnEb8QFj8SB.jpg",
    },
  ];

  const stats = {
    favorites: favoriteMovies.length,
    watchlist: watchlist.length,
    watched: 50,
  };

  return (
    <PageContainer>
      <UpdateSession />
      <div className="space-y-6">
        <ProfileCard user={user} />
        <Stats stats={stats} />
        <FavoritesGrid movies={favoriteMovies} />
        <WatchlistGrid items={watchlist} />
        <Recommendations recommendations={recommendations} />
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
