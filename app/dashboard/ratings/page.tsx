import { auth } from "@/app/auth";
import RatingList from "../components/RatingList";
import { getUserRatingLists } from "@/app/lib/api/userApi";

import { redirect } from "next/navigation";

const RatingsPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");
  const userId = Number(session?.user.id);

  const { ratedMovies, ratedShows } = await getUserRatingLists(userId);

  return (
    <div className="p-6 text-gray-200 ">
      <RatingList mediaList={ratedMovies} mediaType="movie" userId={userId} />
      <RatingList mediaList={ratedShows} mediaType="tv" userId={userId} />
    </div>
  );
};

export default RatingsPage;
