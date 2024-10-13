"use client"

import { Work } from "@/schema/type";
import {  Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Section from "../section";
import React, { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SliderIntroProps {
    projects: Work[]
}

interface ProgressCircleRef {
    current: SVGSVGElement  | null;
}
  
interface ProgressContentRef {
    current: HTMLElement | null;
}


const SliderIntro: React.FC<SliderIntroProps> = ({
    projects
}) => {

    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState<number | null >(null);

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

    const handlerClick = ( id:any ) => {
        router.push(`/works/${id}`);
    }

    const progressCircle = useRef<ProgressCircleRef["current"]>(null);
    const progressContent = useRef<ProgressContentRef["current"]>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty('--progress', String(1 - progress));
        }
  
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return ( 
        <Section>
            <div className="overflow-hidden rounded-xl border-2 shadow-md hover:shadow-slate-800/80">
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
                        {(project.newest || project.field === 'gallery') && (
                            <SwiperSlide>
                                <div className="relative w-full sm:h-[360px] h-[210px] object-cover">
                                        <Image
                                            src={project.headingImg}
                                            alt="new"
                                            className=" brightness-[35%] w-full h-full object-cover"
                                        />
                                  
                                    <div className="absolute z-10 top-0 sm:left-14 left-8 text-white h-full w-full cursor-pointer"
                                        onClick={() => handlerClick(project.id)}
                                    >
                                        <div className=" flex items-center h-full w-full">
                                            <div>
                                                {project.field !== 'gallery' && (
                                                    <Heading as="h2" 
                                                    fontSize={windowWidth && windowWidth >= 640 ? "22px" : "12px"} 
                                                        className="bg-white text-black w-fit px-2 shadow-xl rounded-sm"
                                                    >
                                                        New
                                                    </Heading>
                                                )}
                                                <Heading as="h3" fontSize={windowWidth && windowWidth >= 640 ? "28px" : "16px"} fontWeight={"bold"} color={"yellow.200"} shadow={"xl"}
                                                    className="sm:py-3 py-1 w-[75%]"
                                                >
                                                    {project.title}
                                                </Heading>
                                                <p className="w-[72%] line-clamp-3 font-medium md:text-xl text-sm">
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
}
 
export default SliderIntro;