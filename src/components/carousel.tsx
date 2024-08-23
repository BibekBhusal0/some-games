import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, useCallback } from "react";
import { useDotButton } from "../hooks/use-dot-botton";

// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";

function Carousel({
  slides,
  close_button = undefined,
}: {
  slides: ReactNode[];
  close_button?: ReactNode;
}) {
  const [ref, api] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);
  const scrollPrev = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const controlButtons = [
    { icon: <IoIosArrowBack />, onClick: scrollPrev },
    { icon: <IoIosArrowForward />, onClick: scrollNext },
  ];

  return (
    <div className="embla h-96">
      <div className="embla__viewport" ref={ref}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide flex text-center" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-evenly gap-1 absolute bottom-2 left-0 w-full">
        <div className="flex-center gap-2">
          {controlButtons.map(({ icon, onClick }, index) => (
            <Button
              key={index}
              color="primary"
              onClick={onClick}
              className={cn("min-w-2 rounded-full h-auto p-1 text-xl")}>
              {icon}
            </Button>
          ))}
        </div>

        <div className="flex-center gap-1">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "rounded-full transition-all aspect-square",
                index === selectedIndex
                  ? "bg-default-800  w-3"
                  : "bg-default-400  w-2"
              )}
            />
          ))}
        </div>
        {close_button}
      </div>
    </div>
  );
}

export default Carousel;
