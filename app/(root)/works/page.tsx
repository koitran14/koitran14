/* eslint-disable react/no-unescaped-entities */
"use client"

import Section from "@/components/section";
import { Button, Heading } from "@chakra-ui/react";
import GridItems from "./components/grid-items";
import { ChevronRightCircleIcon } from "lucide-react";
import { useColorModeValue } from "@chakra-ui/react";
import SliderIntro from "@/components/works/slider-intro";
import { works } from "@/data/works";

const Works = () => {
    const activeColor = useColorModeValue( '#f97316', '#ec4899');

    return (
        <Section>
            <div className="pt-5">
                <SliderIntro projects={works}/>
                <div className="flex items-center justify-between pb-10 pt-5">
                    <div>
                        <Heading as="h3" fontSize={22} >Works</Heading>
                    </div>
                    <a href="https://github.com/koitran14?tab=repositories">
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
                <div>
                    <Section>
                        <div className="grid md:grid-cols-2 gap-4 xl:gap-x-5 xl:gap-y-3 items-start justify-center">
                            {works.map((work) => {
                                return work.field === 'works'&& (
                                    <GridItems 
                                    key={work.id}
                                    id={work.id}
                                    title={work.title} 
                                    thumbnail={work.headingImg}
                                    author={work.author}
                                    newest={work.newest}
                                    >            
                                        {work.description}
                                    </GridItems>
                                )
                            })}
                        </div>
                    </Section>
                </div>
            </div>
            <div>
                <div>
                    <div className="flex items-center pt-5 pb-10 border-t-[1px] border-t-white">
                        <Heading as="h3" fontSize={22}>Collaborations</Heading>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 items-start justify-center">
                        <div className="col-span-2">
                            {works.map((work) => {
                                return work.field === 'collabs' && (
                                    <GridItems 
                                    key={work.id}
                                    id={work.id}
                                    title={work.title} 
                                    thumbnail={work.headingImg}
                                    author={work.author}
                                    newest={work.newest}
                                    >            
                                        {work.description}
                                    </GridItems>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
 
export default Works;

