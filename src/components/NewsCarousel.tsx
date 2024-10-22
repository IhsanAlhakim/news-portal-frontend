import { News } from "@/models/news";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getImageUrl } from "@/lib/supabase";
import { Link } from "react-router-dom";

interface NewsCarouselProps {
  newsForCarousel: News[] | null;
}

export default function NewsCarousel({ newsForCarousel }: NewsCarouselProps) {
  return (
    <Carousel className="mx-auto mb-10 w-[600px] h-[400px]">
      <CarouselContent>
        {newsForCarousel?.map((news) => (
          <CarouselItem key={news._id}>
            <div className="relative mx-auto mb-10 w-[600px] h-[400px] bg-slate-700">
              <Link to={`news/${news.category}/${news._id}`}>
                <div className="absolute flex justify-center items-center bottom-0 w-full h-28 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white font-semibold text-2xl">
                    {news.title}
                  </p>
                </div>
              </Link>

              <img
                className="h-full w-full object-cover"
                src={getImageUrl(news.image)}
                alt=""
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
