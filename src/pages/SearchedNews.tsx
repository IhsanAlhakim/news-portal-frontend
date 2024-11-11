import NewsCard from "@/components/NewsCard";
import { News } from "@/models/news";
import { getNewsBySearchQuery } from "@/network/NewsApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    <section className="w-full">
      <div className="text-2xl font-bold">
        <h2 className="text-center">Searching for "{searchQuery}" News</h2>
      </div>
      <hr className="border-gray-300 my-8 mx-auto w-[700px]" />
      <div className="grid grid-cols-3 gap-y-12">
        {newsData && newsData.length > 0 ? (
          newsData.map((news) => <NewsCard key={news._id} news={news} />)
        ) : (
          <div>Berita Tidak Ditemukan</div>
        )}
      </div>
    </section>
  );
}
