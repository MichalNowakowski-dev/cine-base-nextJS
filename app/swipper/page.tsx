import React from "react";
import PageContainer from "../components/ui/pageContainer/PageContainer";
import MySwiperComponent from "../components/Swiper/MySwiper";

import { fetchMediaList } from "../lib/api/tmdbApi";

export default async function Page() {
  const mediaList = await fetchMediaList("movie", "popular", 1);
  return (
    <PageContainer>
      <MySwiperComponent mediaList={mediaList.results} />
    </PageContainer>
  );
}
