export default function NewsCard() {
  return (
    <div className="w-[200px] h-[230px] border-2 mx-auto border-black">
      <div className="bg-slate-500 w-full h-[130px]"></div>
      <div className="h-[calc(100%-130px)] w-full flex flex-col gap-2 pt-3 pb-3">
        <p className="text-xs text-zinc-500">Category</p>
        <p className="text-xl font-semibold">Title</p>
        <p className="text-xs text-zinc-500 mt-auto">Author</p>
      </div>
    </div>
  );
}
