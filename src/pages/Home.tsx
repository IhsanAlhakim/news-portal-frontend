import NewsCard from "@/components/NewsCard";
import NewsCarousel from "@/components/NewsCarousel";
import { News } from "@/models/news";
import { getNewsForUser } from "@/network/NewsApi";
import { useEffect, useState } from "react";

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
    <section className="w-full ">
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold">TODAYS NEWS</h2>
      </div>
      <NewsCarousel newsForCarousel={newsData.carouselNews} />
      <hr className="border-gray-300 my-4 w-[90%] mx-auto" />
      <div className="mb-5">
        <h2 className="pl-4 text-2xl font-bold">OTHER NEWS</h2>
      </div>
      <div className="grid grid-cols-3 gap-y-8">
        {newsData?.otherNews?.map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </section>
  );
}
