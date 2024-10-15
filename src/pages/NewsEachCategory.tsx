import NewsCard from "@/components/NewsCard";

export default function NewsEachCategory() {
  return (
    <section className="w-full">
      <div className="text-2xl font-bold">
        <h2 className="text-center">CATEGORY NEWS</h2>
      </div>
      <hr className="border-gray-300 my-8 mx-auto w-[700px]" />
      <div className="grid grid-cols-3 gap-y-8">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </section>
  );
}