import NewsCardSkeleton from "@/components/skeleton/NewsCardSkeleton";
import { News } from "@/models/news";
import { getNewsBySearchQuery } from "@/network/NewsApi";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchedNewsContainer = lazy(
  () => import("@/components/SearchedNewsContainer")
);

export default function SearchedNews() {
  const [newsData, setNewsData] = useState<News[] | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    async function loadFilteredNews() {
      const filteredNews = await getNewsBySearchQuery(searchQuery);
      setNewsData(filteredNews);
    }
    loadFilteredNews();
  }, []);

  return (
    <section>
      <div className="text-2xl font-bold">
        <h2 className="text-center">Searching for "{searchQuery}" News</h2>
      </div>
      <hr className="w-[80%] md:w-[700px] border-gray-300 my-8 mx-auto" />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </div>
        }
      >
        <SearchedNewsContainer newsData={newsData} />
      </Suspense>
    </section>
  );
}
