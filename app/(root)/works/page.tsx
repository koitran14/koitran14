/* eslint-disable react/no-unescaped-entities */
"use client"

import Section from "@/components/section";
import { Button, Heading } from "@chakra-ui/react";
import GridItems from "./components/grid-items";
import { ChevronRightCircleIcon } from "lucide-react";
import { useColorModeValue } from "@chakra-ui/react";
import SliderIntro from "@/components/works/slider-intro";
import { Project } from "@/type";

const thumbXAgent = "/images/works/the-x-agent/image.png";
const thumbTreasureHunt = "/images/works/the-treasure-hunt/image.gif";
const thumbStoreDashboard = "/images/works/dashboard-for-admin/image.png";
const thumbEcommerceStore = "/images/works/my-ecommerce-store/image.png";


const works: Project[] = [
    {
        id: "my-ecommerce-store",
        title: "Pisces: The E-shop",
        href: thumbEcommerceStore,
        author: "Tran Ngoc Dang Khoi",
        newest: true,
        description: "This is my own store (pisces.io) served for my practice in learning full-stack web development...",
        field: "works"
    },
    {
        id: "store-dashboard",
        title: "Dashboard for Admin",
        href: thumbStoreDashboard,
        author: "Tran Ngoc Dang Khoi",
        newest: true,
        description: "This is a web that supports for admin in business management...",
        field: "works"
    },
    {
        id: "the-x-agent",
        title: "The X Agent Homepage",
        href: thumbXAgent,
        author: "Tran Ngoc Dang Khoi",
        description: "The homepage of the Information Technology Faculty Association for an eSport competition IT Gaming Tour: THE X AGENT.",
        field: "works"

    },
    {
        id: "the-treasure-hunt",
        title: "The Treasure Hunt",
        href: thumbTreasureHunt,
        author: "Tran Ngoc Dang Khoi, Nguyen Tran Hoang Ha, Ha Van Uyen Nhi, Nguyen Hoang Quan",
        newest: true,
        description: "The pirate game as a teamwork project based on Object-Oriented Programming's deep learning and 'the pirate' as the concept.",
        field: "collabs"
    },
]

const Works = () => {
    const activeColor = useColorModeValue( '#f97316', '#ec4899');

    return (
        <Section>
            <div className="pt-5">
                <SliderIntro projects={works}/>
                <div className="flex items-center justify-between pb-10 pt-5">
                    <div>
                        <Heading as="h3" fontSize={24} >Works</Heading>
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
                                    thumbnail={work.href}
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
                        <Heading as="h3" fontSize={24}>Collaborations</Heading>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 items-start justify-center">
                        <div className="col-span-2">
                            {works.map((work) => {
                                return work.field === 'collabs' && (
                                    <GridItems 
                                    key={work.id}
                                    id={work.id}
                                    title={work.title} 
                                    thumbnail={work.href}
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