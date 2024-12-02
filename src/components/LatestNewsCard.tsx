import { getImageUrl } from "@/lib/supabase";
import { News } from "@/models/news";

interface LatestNewsCardProps {
  newsData: News | null;
}

export default function LatestNewsCard({ newsData }: LatestNewsCardProps) {
  return (
    <a href={`/news/${newsData?.category}/${newsData?._id}`}>
      <div className="h-[150px] grid grid-cols-[45%_55%]">
        <div className="bg-slate-600 h-full">
          <img
            className="w-full h-full object-cover"
            src={getImageUrl(newsData?.image)}
            alt="News Image"
          />
        </div>
        <div className="pl-2">
          <p className="text-xs text-zinc-500">{newsData?.category}</p>
          <p className="text-xl font-semibold line-clamp-4">
            {newsData?.title}
          </p>
        </div>
      </div>
    </a>
  );
}
