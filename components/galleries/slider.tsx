"use client"

import { ImageType } from "@/type";
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
            <div className="h-full sm:max-h-[340px] max-h-[250px] overflow-hidden rounded-xl">
                <Swiper
                    loop={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
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
                    {images.map((image) => (
                        <div key={image.alt}>
                    
                            <SwiperSlide>
                                <Image
                                    src={image.href}
                                    alt={image.alt}
                                    className=" brightness-[45%] object-cover w-full "
                                />
                            </SwiperSlide>
                        </div>
                    ))}
                </Swiper>
            </div>
        </Section>
    );
}
 
export default SliderIntro;