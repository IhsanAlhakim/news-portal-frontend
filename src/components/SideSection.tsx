import { latestNewsData } from "@/layouts/RootLayout";
// import LatestNewsCard from "./LatestNewsCard";
import { lazy, Suspense } from "react";
import LatestNewsCardSkeleton from "./skeleton/LatestNewsCardSkeleton";

const LatestNewsCard = lazy(() => import("@/components/LatestNewsCard"));

interface SideSectionProps {
  latestNewsData: latestNewsData;
}

export default function SideSection({ latestNewsData }: SideSectionProps) {
  return (
    <aside className="lg:w-[300px] mt-10 md:mt-14 lg:mt-0 lg:ml-auto">
      <h2 className="pl-4 mb-4 text-2xl lg:text-base font-bold lg:font-semibold">
        LATEST NEWS
      </h2>
      <div className="px-5 lg:px-0 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-5">
        <Suspense
          fallback={
            <>
              <LatestNewsCardSkeleton />
              <LatestNewsCardSkeleton />
              <LatestNewsCardSkeleton />
              <LatestNewsCardSkeleton />
              <LatestNewsCardSkeleton />
            </>
          }
        >
          <LatestNewsCard newsData={latestNewsData.politicNews} />
          <LatestNewsCard newsData={latestNewsData.sportNews} />
          <LatestNewsCard newsData={latestNewsData.healthNews} />
          <LatestNewsCard newsData={latestNewsData.businessNews} />
          <LatestNewsCard newsData={latestNewsData.travelNews} />
        </Suspense>
      </div>
    </aside>
  );
}
