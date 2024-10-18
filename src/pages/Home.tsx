import NewsCard from "@/components/NewsCard";
import NewsCarousel from "@/components/NewsCarousel";

export default function Home() {
  return (
    <section className="w-full ">
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold">TODAYS NEWS</h2>
      </div>
      <NewsCarousel />
      <hr className="border-gray-300 my-4 w-[90%] mx-auto" />
      <div className="mb-5">
        <h2 className="pl-4 text-2xl font-bold">OTHER NEWS</h2>
      </div>
      <div className="grid grid-cols-3 gap-y-8">
        {[1, 2, 3, 4, 5, 6].map((news) => (
          <NewsCard key={news} />
        ))}
      </div>
    </section>
  );
}
