"use client";

import { Work } from "@/schema/type";
import { Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Section from "../section";
import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useColorModeValue } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";

interface SliderIntroProps {
  projects: Work[];
}

interface ProgressCircleRef {
  current: SVGSVGElement | null;
}

interface ProgressContentRef {
  current: HTMLElement | null;
}

const SliderIntro: React.FC<SliderIntroProps> = ({ projects }) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width after component mounts
    setWindowWidth(window.innerWidth);

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlerClick = (id: any) => {
    router.push(`/works/${id}`);
  };

  const progressCircle = useRef<ProgressCircleRef["current"]>(null);
  const progressContent = useRef<ProgressContentRef["current"]>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
    }

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Section>
      <div className="overflow-hidden rounded-xl border-4 border-zinc-200 shadow-xl hover:shadow-slate-500">
        <Swiper
          loop={true}
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          modules={[Autoplay, Pagination]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
          speed={600}
        >
          {projects.map((project) => (
            <div key={project.id}>
              {(project.newest || project.field === "gallery") && (
                <SwiperSlide>
                  <div className="relative w-full sm:h-[360px] h-[210px] object-cover">
                    <Image
                      src={project.headingImg}
                      alt="new"
                      className=" brightness-[35%] w-full h-full object-cover"
                    />

                    <div
                      className="absolute z-10 top-0 left-0 text-white h-full w-full cursor-pointer p-14"
                      onClick={() => handlerClick(project.id)}
                    >
                      <div className=" flex items-center justify-center h-full w-full">
                        <div>
                          {project.field !== "gallery" && (
                             <div className=" rounded-2xl w-fit mb-1"
                             // eslint-disable-next-line react-hooks/rules-of-hooks
                             style={{ backgroundColor: useColorModeValue( '#f97316', '#ec4899')}}
                         >
                             <div className="flex flex-row items-center gap-x-1 text-sm font-semibold  text-white px-3 py-1 h-fit">
                                 <p className="md:text-base text-sm">New</p>
                                 <MdStars className="md:h-[1.2rem] md:w-[1.2rem] w-5 h-5 animate-spin"/>
                             </div>
                         </div>
                          )}

                          <Heading
                            as="h3"
                            fontSize={
                              windowWidth && windowWidth >= 640
                                ? "28px"
                                : "16px"
                            }
                            fontWeight={"bold"}
                            color={"yellow.200"}
                            className="sm:py-3 py-1 w-[90%]"
                          >
                            {project.title}
                          </Heading>
                          <p className="w-[90%] line-clamp-3 font-medium md:text-xl text-sm">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </div>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

export default SliderIntro;
