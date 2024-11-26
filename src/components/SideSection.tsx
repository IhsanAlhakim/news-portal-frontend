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
    <aside className="ml-auto w-[300px]">
      <h2 className="mb-4 font-semibold">LATEST NEWS</h2>
      <div className="flex flex-col gap-5 w-full">
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
