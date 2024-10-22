import { getImageUrl } from "@/lib/supabase";
import { News } from "@/models/news";
import { Link } from "react-router-dom";

interface LatestNewsCardProps {
  newsData: News | null;
}

export default function LatestNewsCard({ newsData }: LatestNewsCardProps) {
  return (
    <a href={`/news/${newsData?.category}/${newsData?._id}`}>
      <div className="w-full h-[150px] flex">
        <div className="bg-slate-600 h-full w-[120px]">
          <img
            className="w-full h-full object-cover"
            src={getImageUrl(newsData?.image)}
            alt=""
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
