import {
  fetchMediaByID,
  fetchProviders,
  fetchMediaCast,
  fetchRecommendationsList,
  fetchSimilarList,
  fetchVideosList,
  fetchImages,
} from "@/app/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movieDetails = await fetchMediaByID(id, "movie");
  const providers = await fetchProviders(id, "movie");
  const movieCast = await fetchMediaCast(id, "movie");
  const movieRecommendationsList = await fetchRecommendationsList(id);
  const movieSimilarList = await fetchSimilarList(id);
  const videoList = await fetchVideosList(id);
  const imagesList = await fetchImages(id, "movie");

  return (
    <main className="xl:max-w-screen-xl mx-auto pt-24 md:pt-28 px-4">
      page {id}
    </main>
  );
}
