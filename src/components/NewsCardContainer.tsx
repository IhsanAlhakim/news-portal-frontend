import { News } from "@/models/news";
import NewsCard from "./NewsCard";

interface NewsCardContainerProps {
  newsData: News[] | null;
}

export default function NewsCardContainer({
  newsData,
}: NewsCardContainerProps) {
  return (
    <>
      {newsData?.map((news) => (
        <NewsCard key={news._id} news={news} />
      ))}
    </>
  );
}
