"use client"

import { Project } from "@/type";
import { Button, Heading, Image } from "@chakra-ui/react";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Section from "../section";
import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SliderIntroProps {
    projects: Project[]
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
            <div className="h-full max-h-[340px] overflow-hidden rounded-xl">
            <Swiper
                loop={true}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
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
                            <div className="relative">
                                <Image
                                    src={project.href}
                                    alt="new"
                                    className=" brightness-[50%] object-cover object-center h-full w-full"
                                />
                                <div className="absolute sm:block hidden z-10 top-0 left-14 text-white h-full w-full">
                                    <div className=" flex items-center h-full w-full">
                                        <div>
                                            {project.field !== 'gallery' && (
                                                <Heading as="h2" fontSize={17} 
                                                    className="bg-white text-black w-fit px-2 shadow-xl rounded-sm"
                                                >
                                                    New
                                                </Heading>
                                            )}
                                            <Heading as="h3" fontSize={28} fontWeight={"bold"} color={"yellow.200"} shadow={"xl"}
                                                className="py-3"
                                            >
                                                {project.title}
                                            </Heading>

                                            <p className="w-[60%] pb-6 overflow-hidden font-semibold text-[20px] text-justify">
                                                {project.description}
                                            </p>
                                            
                                            {project.field !== 'gallery' && (
                                                <Button variant="solid" rightIcon={<ChevronRightIcon />}
                                                    _hover={{transform: "scale(1.05)",  color: "#000000", backgroundColor: "#ffffff"}}
                                                    onClick={() => handlerClick(project.id)}
                                                    borderRadius={20}
                                                    shadow={"xl"}
                                                >
                                                    More 
                                                </Button>
                                            )}
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