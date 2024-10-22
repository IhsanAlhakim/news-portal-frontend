import ManageNewsTable from "@/components/ManageNewsTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { News } from "@/models/news";
import { getNews } from "@/network/NewsApi";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageNews() {
  const [newsData, setNewsData] = useState<News[] | undefined>(undefined);

  useEffect(() => {
    async function loadNewsCount() {
      const newsData = await getNews();
      setNewsData(newsData);
    }
    loadNewsCount();
  }, []);

  return (
    <div className="bg-white min-h-[450px] rounded-xl p-5">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Manage News</h3>
        <Button className=" bg-violet-950 ml-auto" asChild>
          <Link to={"/dashboard/news/add"}>
            <Plus className="mr-2" /> Add Data
          </Link>
        </Button>
      </div>
      <Separator className="my-3 border-1 bg-violet-950" />
      <div className="max-h-[350px] overflow-auto ">
        <ManageNewsTable newsList={newsData} setNewsList={setNewsData} />
      </div>
    </div>
  );
}
