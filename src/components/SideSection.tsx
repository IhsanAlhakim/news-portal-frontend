import LatestNewsCard from "./LatestNewsCard";

export default function SideSection() {
  return (
    <aside className="ml-auto w-full">
      <h2 className="mb-4 font-semibold">LATEST NEWS</h2>
      <div className="flex flex-col gap-5">
        <LatestNewsCard />
        <LatestNewsCard />
        <LatestNewsCard />
        <LatestNewsCard />
        <LatestNewsCard />
      </div>
    </aside>
  );
}
