import { News } from "@/models/news";
import NewsCard from "./NewsCard";

interface SearchedNewsContainerProps {
  newsData: News[] | null;
}

export default function SearchedNewsContainer({
  newsData,
}: SearchedNewsContainerProps) {
  return (
    <>
      {newsData && newsData.length > 0 ? (
        <div className="grid grid-cols-3 gap-y-12">
          {newsData.map((news) => (
            <NewsCard key={news._id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center">Berita Tidak Ditemukan</div>
      )}
    </>
  );
}
