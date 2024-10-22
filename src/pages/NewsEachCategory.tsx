import NewsCard from "@/components/NewsCard";
import { News } from "@/models/news";
import { getNewsByCategory } from "@/network/NewsApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NewsEachCategory() {
  const [newsData, setNewsData] = useState<News[] | null>(null);
  const { category } = useParams();

  useEffect(() => {
    async function loadHomeNews() {
      const newsForCategory = await getNewsByCategory(category);
      setNewsData(newsForCategory);
    }
    loadHomeNews();
  }, []);

  return (
    <section className="w-full">
      <div className="text-2xl font-bold">
        <h2 className="text-center">{category?.toUpperCase()} NEWS</h2>
      </div>
      <hr className="border-gray-300 my-8 mx-auto w-[700px]" />
      <div className="grid grid-cols-3 gap-y-8">
        {newsData?.map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </section>
  );
}
