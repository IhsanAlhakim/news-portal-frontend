import { getImageUrl } from "@/lib/supabase";
import { News } from "@/models/news";

interface LatestNewsCardProps {
  newsData: News | null;
}

export default function LatestNewsCard({ newsData }: LatestNewsCardProps) {
  return (
    <a href={`/news/${newsData?.category}/${newsData?._id}`}>
      <div className="w-full h-[150px] grid grid-cols-[150px_calc(100%-150px)]">
        <div className="bg-slate-600 h-full">
          <img
            className="w-full h-full object-cover"
            src={getImageUrl(newsData?.image)}
            alt="News Image"
          />
        </div>
        <div className="pl-2">
          <p className="text-xs text-zinc-500">{newsData?.category}</p>
          <p className="text-xl font-semibold">{newsData?.title}</p>
        </div>
      </div>
    </a>
  );
}
