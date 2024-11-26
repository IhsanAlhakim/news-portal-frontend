import NewsCardSkeleton from "@/components/skeleton/NewsCardSkeleton";
import { News } from "@/models/news";
import { getNewsByCategory } from "@/network/NewsApi";
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewsCardContainer = lazy(() => import("@/components/NewsCardContainer"));

export default function NewsEachCategory() {
  const [newsData, setNewsData] = useState<News[] | null>(null);
  const { category } = useParams();

  useEffect(() => {
    async function loadNews() {
      const newsData = await getNewsByCategory(category);
      setNewsData(newsData);
    }
    loadNews();
  }, []);

  return (
    <section className="w-full">
      <div className="text-2xl font-bold">
        <h2 className="text-center">{category?.toUpperCase()} NEWS</h2>
      </div>
      <hr className="border-gray-300 my-8 mx-auto w-[700px]" />
      <div className="grid grid-cols-3 gap-y-12">
        <Suspense
          fallback={
            <>
              <NewsCardSkeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
            </>
          }
        >
          <NewsCardContainer newsData={newsData} />
        </Suspense>
      </div>
    </section>
  );
}
