import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import {type Product } from "@/types";
import { Link } from "react-router";

interface Props {
  products: Product[];
}

export const Carousal = ({products}: Props) => {
  //stopOnInteraction that mena user even click carsoul is working moving 
  const plugins = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <div className="w-full relative px-4 md:px-12">
      <Carousel
        plugins={[plugins.current]}
        className="w-full"
        // onMouseEnter={plugins.current.stop}
        // onMouseLeave={plugins.current.reset}
      >
        <CarouselContent className="">
          {products.map((product, index) => (
            <CarouselItem 
              key={index}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 space-x-2"
            >
              <div className="p-1 h-full">
                <Card className="h-full border-none shadow-none bg-transparent">
                  <CardContent className="flex flex-row items-center gap-4 p-0 h-full">
                    {/* Image Section */}
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted/30">
                      <img 
                        src={product.images[0]?.path} 
                        loading="lazy"
                        decoding="async"
                        alt={product.name} 
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col flex-1 gap-1 text-left">
                      <h3 className="font-bold text-sm md:text-base text-[#056152] truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-[#056152]/70 line-clamp-2">
                        {product.description.length > 55 ? product.description.slice(0, 55) + "..." : product.description}
                      </p>
                      <Link to={`/products/${product.id}`} className="text-[10px] md:text-xs font-bold text-[#056152] mt-1 text-left hover:underline">
                        Read more
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default Carousal;