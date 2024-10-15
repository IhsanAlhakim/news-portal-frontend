import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function NewsCarousel() {
  return (
    <Carousel className="mx-auto mb-10 w-[600px] h-[400px]">
      <CarouselContent>
        {[1, 2, 3, 4].map((news) => (
          <CarouselItem>
            <div className="mx-auto mb-10 w-[600px] h-[400px] bg-green-500">
              {news}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
