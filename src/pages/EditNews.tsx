import AddEditNewsForm from "@/components/AddEditNewsForm";
import { Separator } from "@/components/ui/separator";
import { News } from "@/models/news";
import { getNewsById } from "@/network/NewsApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditNews() {
  const { newsId } = useParams();

  const [data, setData] = useState<News | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      if (newsId) {
        const news = await getNewsById(newsId);
        setData(news);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="bg-white min-h-[450px] rounded-xl p-5">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Edit News</h3>
      </div>
      <Separator className="my-3 border-1 bg-violet-950" />
      <AddEditNewsForm type="EDIT" data={data} />
    </div>
  );
}
