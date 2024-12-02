// import DashboardCard from "@/components/DashboardCard";
// import NewsTable from "@/components/NewsTable";
import DashboardCardSkeleton from "@/components/skeleton/DashboardCardSkeleton";
import NewsTableSkeleton from "@/components/skeleton/NewsTableSkeleton";
import { Separator } from "@/components/ui/separator";
import { News } from "@/models/news";
import { getCommentCount, getNews, getNewsCount } from "@/network/NewsApi";
import {
  BookCheck,
  BookDashed,
  MessageSquareText,
  Newspaper,
} from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";

const DashboardCard = lazy(() => import("@/components/DashboardCard"));
const NewsTable = lazy(() => import("@/components/NewsTable"));

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
    <div className="flex flex-col lg:grid lg:grid-rows-[150px_calc(100%-150px)] gap-5 mt-5 ">
      <div className="grid grid-cols-2 md:flex gap-5 lg:gap-10 px-5">
        <Suspense
          fallback={
            <>
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </>
          }
        >
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
        </Suspense>
      </div>
      <div className="bg-white w-[350px] md:w-[650px] lg:w-full min-h-[300px] p-5 mx-auto rounded-xl">
        <h3 className="text-xl font-bold">Recent News</h3>
        <Separator className="my-3 border-1 bg-violet-950" />
        <div className="max-h-[200px] overflow-auto ">
          <Suspense fallback={<NewsTableSkeleton />}>
            <NewsTable newsList={dashboardData.newsData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
