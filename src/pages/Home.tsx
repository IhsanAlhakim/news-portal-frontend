import NewsCard from "@/components/NewsCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <section className="w-full ">
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold">TODAYS NEWS</h2>
      </div>
      <Carousel className="mx-auto mb-10 w-[600px] h-[400px] bg-slate-500">
        <CarouselContent>
          <CarouselItem>
            <div className="mx-auto mb-10 w-[600px] h-[400px] bg-green-500"></div>
          </CarouselItem>
          <CarouselItem>
            <div className="mx-auto mb-10 w-[600px] h-[400px] bg-red-500"></div>
          </CarouselItem>
          <CarouselItem>
            <div className="mx-auto mb-10 w-[600px] h-[400px] bg-blue-500"></div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <hr className="border-gray-300 my-4 w-[900px] mx-auto" />
      <div className="mb-5">
        <h2 className="pl-4 text-2xl font-bold">OTHER NEWS</h2>
      </div>
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
