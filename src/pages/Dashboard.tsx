import DashboardCard from "@/components/DashboardCard";
import NewsTable from "@/components/NewsTable";
import { Separator } from "@/components/ui/separator";
import { News } from "@/models/news";
import { getCommentCount, getNews, getNewsCount } from "@/network/NewsApi";
import {
  BookCheck,
  BookDashed,
  MessageSquareText,
  Newspaper,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardData {
  totalNews: number;
  totalPublishedNews: number;
  totalDraftedNews: number;
  totalComments: number;
  newsData: News[];
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalNews: 0,
    totalPublishedNews: 0,
    totalDraftedNews: 0,
    totalComments: 0,
    newsData: [],
  });

  useEffect(() => {
    async function loadDashboardData() {
      const [
        totalNewsData,
        totalPublishedNewsData,
        totalDraftedNewsData,
        totalCommentsData,
        newsData,
      ] = await Promise.all([
        getNewsCount(),
        getNewsCount("published"),
        getNewsCount("drafted"),
        getCommentCount(),
        getNews(5),
      ]);

      setDashboardData({
        totalNews: totalNewsData.newsCount,
        totalPublishedNews: totalPublishedNewsData.newsCount,
        totalDraftedNews: totalDraftedNewsData.newsCount,
        totalComments: totalCommentsData.commentsCount,
        newsData: newsData,
      });
    }
    loadDashboardData();
  }, []);

  return (
    <div className="grid grid-rows-[150px_calc(100%-150px)]">
      <div className="flex gap-10">
        <DashboardCard
          title="Total News"
          count={dashboardData.totalNews}
          Icon={Newspaper}
        />
        <DashboardCard
          title="Total Published News"
          count={dashboardData.totalPublishedNews}
          Icon={BookCheck}
        />
        <DashboardCard
          title="Total Drafted News"
          count={dashboardData.totalDraftedNews}
          Icon={BookDashed}
        />
        <DashboardCard
          title="Total Comments"
          count={dashboardData.totalComments}
          Icon={MessageSquareText}
        />
      </div>
      <div className="bg-white min-h-[300px] rounded-xl p-5">
        <h3 className="text-xl font-bold">Recent News</h3>
        <Separator className="my-3 border-1 bg-violet-950" />
        <div className="max-h-[200px] overflow-auto ">
          {dashboardData.newsData.length > 0 ? (
            <NewsTable newsList={dashboardData.newsData} />
          ) : (
            <div className="text-center mt-3 text-xl">No News Data Yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
