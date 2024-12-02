import { getImageUrl } from "@/lib/supabase";
import { News } from "@/models/news";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface NewsCarouselProps {
  newsForCarousel: News[] | null;
}

export default function NewsCarousel({ newsForCarousel }: NewsCarouselProps) {
  return (
    <Carousel className="md:w-[600px] h-[250px] md:h-[400px] mx-auto mb-10">
      <CarouselContent>
        {newsForCarousel?.map((news) => (
          <CarouselItem key={news._id}>
            <div className="md:w-[600px] h-[250px] md:h-[400px] relative mx-auto mb-10  bg-slate-700">
              <Link to={`news/${news.category}/${news._id}`}>
                <div className="w-full h-28 absolute flex justify-center items-center bottom-0 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white font-semibold md:text-2xl p-2 line-clamp-2">
                    {news.title}
                  </p>
                </div>
              </Link>

              <img
                className="h-full w-full object-cover"
                src={getImageUrl(news.image)}
                alt="News Image"
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
