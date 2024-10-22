import { latestNewsData } from "@/layouts/RootLayout";
import LatestNewsCard from "./LatestNewsCard";

interface SideSectionProps {
  latestNewsData: latestNewsData;
}

export default function SideSection({ latestNewsData }: SideSectionProps) {
  return (
    <aside className="ml-auto w-full">
      <h2 className="mb-4 font-semibold">LATEST NEWS</h2>
      <div className="flex flex-col gap-5">
        {latestNewsData.politicNews && (
          <LatestNewsCard newsData={latestNewsData.politicNews} />
        )}
        {latestNewsData.sportNews && (
          <LatestNewsCard newsData={latestNewsData.sportNews} />
        )}
        {latestNewsData.healthNews && (
          <LatestNewsCard newsData={latestNewsData.healthNews} />
        )}
        {latestNewsData.businessNews && (
          <LatestNewsCard newsData={latestNewsData.businessNews} />
        )}
        {latestNewsData.travelNews && (
          <LatestNewsCard newsData={latestNewsData.travelNews} />
        )}
      </div>
    </aside>
  );
}
