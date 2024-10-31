import { getImageUrl } from "@/lib/supabase";
import { News } from "@/models/news";
import { Link } from "react-router-dom";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="w-[200px] h-[230px] mx-auto grid grid-rows-[130px_calc(100%-130px)]">
      <div className="bg-slate-500 w-full">
        <img
          src={getImageUrl(news.image)}
          className="w-full h-full object-cover"
          alt="Header Berita"
        />
      </div>
      <Link to={`/news/${news.category}/${news._id}`}>
        <div className="w-full flex flex-col gap-2 pt-3 pb-3">
          <p className="text-xs text-zinc-500">{news.category}</p>
          <p className="text-xl font-semibold line-clamp-3">{news.title}</p>
          <p className="text-xs text-zinc-500 mt-auto">{news.createdBy}</p>
        </div>
      </Link>
    </div>
  );
}
