"use client";

import { Work } from "@/schema/type";
import { Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Section from "../section";
import React from "react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useColorModeValue } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute bottom-3 right-3 md:bottom-8 md:right-8 flex gap-1.5 md:gap-3 z-30 pointer-events-none opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity duration-300 delay-100">
      <button 
        onClick={(e) => { e.stopPropagation(); swiper.slidePrev(); }}
        className="bg-black/40 hover:bg-white/20 p-2 md:p-3 rounded-full text-white backdrop-blur-lg transition-all pointer-events-auto border border-white/20 shadow-xl hover:scale-105"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); swiper.slideNext(); }}
        className="bg-black/40 hover:bg-white/20 p-2 md:p-3 rounded-full text-white backdrop-blur-lg transition-all pointer-events-auto border border-white/20 shadow-xl hover:scale-105"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </button>
    </div>
  );
};

interface SliderIntroProps {
  projects: Work[];
}

const SliderIntro: React.FC<SliderIntroProps> = ({ projects }) => {
  const router = useRouter();
  const badgeBg = useColorModeValue('#f97316', '#ec4899');

  const handlerClick = (id: any) => {
    router.push(`/works/${id}`);
  };

  return (
    <Section>
      <div className="overflow-hidden rounded-xl md:rounded-2xl border border-black/10 dark:border-white/10 shadow-lg group/slider">
        <Swiper
          loop={true}
          spaceBetween={0}
          effect={"fade"}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, EffectFade]}
          className="mySwiper w-full h-full"
          speed={800}
        >
          <SwiperNavButtons />
          {projects.map((project) => (
            <React.Fragment key={project.id}>
              {(project.newest || project.field === "gallery") && (
                <SwiperSlide>
                  <div className="relative w-full md:h-[400px] h-[220px] group overflow-hidden cursor-pointer bg-black" onClick={() => handlerClick(project.id)}>
                    <Image
                      src={project.headingImg}
                      alt={project.title}
                      className="brightness-[45%] group-hover:brightness-[65%] transition-all duration-700 ease-out group-hover:scale-105 w-full h-full object-cover transform origin-center"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none opacity-80" />

                    <div className="absolute z-10 bottom-0 left-0 w-full p-4 md:p-10 pr-24 md:pr-32 flex flex-col justify-end pointer-events-none text-white">
                        <div className="transform translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            {/* Tags or New Badge */}
                            {project.field !== "gallery" && (
                              <div 
                                className="rounded-full w-fit mb-2 md:mb-3 px-3 py-1 flex items-center gap-1.5 shadow-md"
                                style={{ backgroundColor: badgeBg }}
                              >
                                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white">New Release</p>
                                <MdStars className="w-3.5 h-3.5 text-white animate-pulse"/>
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-bold tracking-tight mb-1 md:mb-2 drop-shadow-lg leading-tight">
                              {project.title}
                            </h3>

                            {/* Description */}
                            <p className="w-full line-clamp-2 font-medium text-[11px] sm:text-xs md:text-sm text-white/90 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-75 pr-2">
                              {project.description}
                            </p>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </React.Fragment>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

export default SliderIntro;
