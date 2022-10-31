// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CoverImage from "./cover-image";
import Link from "next/link";
import Twitter from "./twitter";
import Discord from "./discord";

const Carousel = ({ items }) => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      style={{
        "--swiper-navigation-color": "#8C50EE",
        "--swiper-pagination-color": "#8C50EE",
        "--swiper-navigation-size": "24px",
        // "--swiper-pagination-bullet-inactive-color": "#000",
        // "--swiper-pagination-bullet-inactive-opacity": "0.2",
      }}
      className="max-w-full"
    >
      {items.map((item, index) => {
        const {
          title,
          featuredImage,
          carouselImage,
          slug,
          caption,
          projectTwitter,
          projectDiscord,
        } = item;
        return (
          <SwiperSlide key={index}>
            <div className="relative">
              <CoverImage
                title={title}
                url={carouselImage?.url ?? featuredImage.url}
                slug={slug}
                route={"projects"}
                height={"200"}
              />
              <div
                className="absolute top-0 text-white bg-black w-full px-4 py-2 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0,0,0,.35))",
                }}
              >
                <div className="flex items-center">
                  <h3>
                    <Link href={`/projects/${slug}`}>
                      <a className="text-md hover:underline hover:cursor-pointer font-semibold">
                        {title}
                      </a>
                    </Link>
                  </h3>
                  <a
                    className="mx-2 hover:scale-125 duration-200"
                    href={projectTwitter}
                    target="_blank"
                  >
                    <Twitter fill={"#ffffff"} width={12} />
                  </a>
                  <a
                    className="mx-2 scale-125 hover:scale-150 duration-200"
                    href={projectDiscord}
                    target="_blank"
                  >
                    <Discord fill={"#ffffff"} width={12} />
                  </a>
                </div>
                <p className="text-xs font-extralight">{caption}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
