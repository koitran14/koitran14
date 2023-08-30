"use client"

import Section from "@/components/section";
import Gallery from "@/components/ui/gallery";
import SliderIntro from "@/components/galleries/slider";
import { Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { ChevronRightCircleIcon, GalleryHorizontalEndIcon } from "lucide-react";
import { useState } from "react";
import Filter from "@/components/galleries/filter";

import galleryImgs from "@/data/galleryData";
import galleryActivity from "@/data/galleryActivities";


const GalleriesPage = () => {
    
    const [filteredImages, setFilteredImages] = useState(galleryImgs);

    const activeColor = useColorModeValue( '#f97316', '#ec4899');

    return (
        <Section>
            <div className="relative">
                <SliderIntro images={galleryImgs}/>
                <div className="absolute sm:top-[20%] top-[8%] sm:left-16 left-4 z-10 max-w-screen">
                    <div className="flex flex-col">
                        <Heading fontSize={22} className="text-slate-200 font-semibold flex sm:justify-start justify-center">
                            Activities
                        </Heading>
                        <div className="py-6">
                            <Filter data={galleryActivity} valueKey="id" images={galleryImgs} setFilteredImages={setFilteredImages} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between px-3">
                    <Heading as="h2" variant="section-title" className="flex gap-x-2 items-center">
                        <GalleryHorizontalEndIcon/> 
                        My Gallery
                    </Heading>
                    <a href="https://www.instagram.com/khoitran1403/">
                            <Button 
                                as="button" 
                                variant="solid" 
                                rightIcon={<ChevronRightCircleIcon />}
                                size="sm"
                                _hover={{ backgroundColor: activeColor, color: '#ffffff'}}
                                _active={{ opacity: 0.9 }}
                            >
                                More
                            </Button>
                    </a>
                </div>
                <div className="pt-4">
                    <Gallery images={filteredImages} />
                </div>
            </div>
        </Section>
    );
}

export default GalleriesPage;