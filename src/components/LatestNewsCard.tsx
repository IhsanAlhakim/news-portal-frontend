export default function LatestNewsCard() {
  return (
    <div className="border-black border-2 w-full h-[150px] flex">
      <div className="bg-slate-600 h-full w-[120px]"></div>
      <div className="pl-2">
        <p className="text-xs text-zinc-500">Category</p>
        <p className="text-xl font-semibold">Title</p>
      </div>
    </div>
  );
}
