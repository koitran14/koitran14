"use client"

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";
import { useEffect, useState } from "react";


const title = "AlgoVisualizer.io: Algorithms Visualizer Website";
const author = "Trần Ngọc Đăng Khôi";
const description = `This website offers visualizations and explanations for Algorithms and Data Structures. Dive into sorting, graph traversal, and dynamic programming, gaining insights into their efficiency and real-world applications. Understand complex concepts effortlessly through interactive representations, strengthening your problem-solving skills in algorithmic scenarios.`;
const headingImg="/images/works/algoVisualizer/image.png"

const linkdemo = "https://algorithm-visualizer-koitran14.vercel.app/";
const linkSource = "https://github.com/koitran14/Algorithm-Visualizer";
const SourceTitle = "Algorithms Visualizer | Github";

const stack = "Next.JS, JavaScript, Tailwind CSS, React, Chart.JS";

const images = [
{
    href: "/images/works/algoVisualizer/1.png",
},
{
    href: "/images/works/algoVisualizer/2.png",
},
{
    href: "/images/works/algoVisualizer/3.png",
},
{
    href: "/images/works/algoVisualizer/4.png",
},
{
    href: "/images/works/algoVisualizer/5.png",
},
]

const AlgoVisualizerPage = () => {
    const themeColor = useColorModeValue( '#f97316', '#22D3EE');

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
      
    return (
        <Section>
            <Address 
                prevLink="/works"
                prevTitle="Works"
                currentTitle={title}
            />
            <div>
                <div className="pb-5 pt-2">
                    <Image 
                        src={headingImg}
                        alt={title}
                        className="rounded-lg"
                    />
                </div>
                <div>

                    {/* Heading and description */}
                    <div className="flex items-start justify-between ">
                        <div className="flex gap-x-3 flex-col gap-y-1 justify-start">
                            <Heading className="w-[80%]" as="h3" fontSize={windowWidth && windowWidth >=640 ? "25" : "22"} color={themeColor}>{title}</Heading>
                            <Badge className="text-lg w-fit">2023 - </Badge>
                        </div>
                        <div className="rounded-md px-2 py-1 text-white font-semibold flex items-center gap-x-1"
                            style={{ backgroundColor: themeColor }}
                        >
                            <p>New</p>
                            <MdStars className="h-[1.2rem] w-[1.2rem]"/>
                        </div>
                    </div>
                    <p className="font-semibold text-slate-500 text-bold w-[70%]">{author}</p>
                    <div className="py-5">
                        <p className="text-justify">{description}</p>
                    </div>
                   
                   {/* Place to put all sources and tags */}
                   {/* WEBSITE */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>WEBSITE</Meta>
                        </div>
                        <Link href={linkdemo} target="_blank" className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">{linkdemo}</Link>
                    </MetaPlace>

                    {/* PLATFORM */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>PLATFORM</Meta>
                        </div>
                        <p className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">Windows/macOS/Linux</p>
                    </MetaPlace>

                    {/* STACK */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>STACK</Meta>
                        </div>
                        <p className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">{stack}</p>
                    </MetaPlace>

                    {/* GITHUB SOURCES */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>SOURCE</Meta>
                        </div>
                        <Link href={linkSource} className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">{SourceTitle}</Link>
                    </MetaPlace>
                </div>
            </div>
            <div>
                <Heading as="h3" fontSize={18} variant="section-title" className=" py-4">Screenshots</Heading>
                <Gallery images={images} />
            </div>

       </Section>
    );
}
 
export default AlgoVisualizerPage;