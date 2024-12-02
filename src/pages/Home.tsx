import CarouselSkeleton from "@/components/skeleton/CarouselSkeleton";
import NewsCardSkeleton from "@/components/skeleton/NewsCardSkeleton";
import { News } from "@/models/news";
import { getNewsForUser } from "@/network/NewsApi";
import { lazy, Suspense, useEffect, useState } from "react";

const NewsCarousel = lazy(() => import("@/components/NewsCarousel"));
const NewsCardContainer = lazy(() => import("@/components/NewsCardContainer"));

interface HomeNews {
  carouselNews: News[] | null;
  otherNews: News[] | null;
}

export default function Home() {
  const [newsData, setNewsData] = useState<HomeNews>({
    carouselNews: null,
    otherNews: null,
  });

  useEffect(() => {
    async function loadHomeNews() {
      const [newsForHome, newsForCarousel] = await Promise.all([
        getNewsForUser(),
        getNewsForUser(3),
      ]);
      setNewsData({
        carouselNews: newsForCarousel,
        otherNews: newsForHome,
      });
    }
    loadHomeNews();
  }, []);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold">TODAYS NEWS</h2>
      </div>
      <Suspense fallback={<CarouselSkeleton />}>
        <NewsCarousel newsForCarousel={newsData.carouselNews} />
      </Suspense>
      <hr className="w-[90%] border-gray-300 my-4 mx-auto" />
      <div className="mb-5">
        <h2 className="pl-4 text-2xl font-bold">OTHER NEWS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
        <Suspense
          fallback={
            <>
              <NewsCardSkeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
            </>
          }
        >
          <NewsCardContainer newsData={newsData.otherNews} />
        </Suspense>
      </div>
    </section>
  );
}
