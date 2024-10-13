"use client"

import { ImageType } from "@/schema/type";
import { Image } from "@chakra-ui/react";

import Section from "../section";
import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface SliderIntroProps {
    images: ImageType[],
}

interface ProgressCircleRef {
    current: SVGSVGElement  | null;
}
  
interface ProgressContentRef {
    current: HTMLElement | null;
}


const SliderIntro: React.FC<SliderIntroProps> = ({
    images
}) => {

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
            <div className=" overflow-hidden rounded-xl">
                <Swiper
                    loop={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        enabled: false,
                        clickable: false,  
                    }}
                    
                    modules={[Autoplay, Pagination]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper"
                    speed={600}
                >
                    {images.map((image) => (
                        <div key={image.alt}>
                    
                            <SwiperSlide>
                                <div className="sm:h-[340px] h-[230px] w-full">
                                    <Image
                                        src={image.href}
                                        alt={image.alt}
                                        w={"full"}
                                        h={"full"}
                                        className=" brightness-[45%] object-cover w-full h-full"
                                    />
                                </div>
                            </SwiperSlide>
                        </div>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
}
 
export default SliderIntro;