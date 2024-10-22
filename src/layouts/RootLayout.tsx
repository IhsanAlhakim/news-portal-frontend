import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideSection from "@/components/SideSection";
import { News } from "@/models/news";
import { getNewsByCategory } from "@/network/NewsApi";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export interface latestNewsData {
  politicNews: News | null;
  sportNews: News | null;
  healthNews: News | null;
  businessNews: News | null;
  travelNews: News | null;
}

function RootLayout() {
  const [latestNewsData, setlatestNewsData] = useState<latestNewsData>({
    politicNews: null,
    sportNews: null,
    healthNews: null,
    businessNews: null,
    travelNews: null,
  });

  useEffect(() => {
    async function loadLatestNews() {
      const [
        politicNewsData,
        sportNewsData,
        healthNewsData,
        businessNewsData,
        travelNewsData,
      ] = await Promise.all([
        getNewsByCategory("politics", 1),
        getNewsByCategory("sports", 1),
        getNewsByCategory("health", 1),
        getNewsByCategory("business", 1),
        getNewsByCategory("travel", 1),
      ]);
      setlatestNewsData({
        politicNews: politicNewsData[0],
        sportNews: sportNewsData[0],
        healthNews: healthNewsData[0],
        businessNews: businessNewsData[0],
        travelNews: travelNewsData[0],
      });
    }
    loadLatestNews();
  }, []);

  return (
    <>
      <div className="min-h-screen grid grid-rows-[156px_calc(100%-156px)]">
        <Header />
        <main className="mt-14 mb-14">
          <div className="max-w-screen-lg mx-auto grid grid-cols-[calc(100%-300px)_300px]">
            <Outlet />
            <SideSection latestNewsData={latestNewsData} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
