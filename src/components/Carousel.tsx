import { useRef } from "react";
import type { FC } from "react";
import { withBase } from "../utils/withBase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css/bundle";

export type CarouselProps = {
  images: string[];
  ariaLabel?: string;
  /** Accepts number (px) or CSS length (e.g., "var(--carousel-h)") */
  height?: number | string;
  auto?: boolean;
  showDots?: boolean;
};

const Carousel: FC<CarouselProps> = ({
  images,
  ariaLabel = "Image carousel",
  height = "var(--carousel-h, 320px)", // responsive via CSS var
  auto = true,
  showDots = true,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  if (!images?.length) return null;

  return (
    <div
      aria-label={ariaLabel}
      className="carousel-neu neu-surface"
      style={{ borderRadius: 16, overflow: "hidden" }}
    >
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop={images.length > 1}
        pagination={showDots ? { clickable: true } : false}
        autoplay={auto && images.length > 1 ? { delay: 3500, disableOnInteraction: false } : false}
        a11y={{ prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide" }}
        onSwiper={(instance) => (swiperRef.current = instance)}
        style={{ width: "100%", height }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={withBase(src)}
              alt={`Slide ${idx + 1} of ${images.length}`}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <>
          <button
            className="carousel-side left"
            aria-label="Previous image"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          <button
            className="carousel-side right"
            aria-label="Next image"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </>
      )}
    </div>
  );
};

export default Carousel;
