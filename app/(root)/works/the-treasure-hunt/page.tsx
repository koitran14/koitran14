"use client"

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";
import { useEffect, useState } from "react";


const title = "The Treasure Hunt";
const author = "Trần Ngọc Đăng Khôi, Nguyễn Trần Hoàng Hạ, Hà Văn Uyển Nhi, Nguyễn Hoàng Quân";
const description = "The pirate game as a teamwork project based on Object-Oriented Programming's deep learning and 'the pirate' as the concept.";
const headingImg="/images/works/the-treasure-hunt/image.gif"

const linkSource = "https://github.com/koitran14/The-Treasure-Hunt-Project";
const SourceTitle = "The Treasure Hunt Project | Github";

const stack = "HTML, CSS, JavaScript.";

const images = [
{
    href: "/images/works/the-treasure-hunt/1.png",
},
{
    href: "/images/works/the-treasure-hunt/2.png",
},
{
    href: "/images/works/the-treasure-hunt/3.png",
},
{
    href: "/images/works/the-treasure-hunt/4.png",
},
{
    href: "/images/works/the-treasure-hunt/5.png",
},
]


const DashBoardForAdmin = () => {
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
                    <div className="flex sm:items-center items-start justify-between ">
                        <div className="flex gap-x-3 flex-col-reverse sm:flex-row gap-y-1 justify-start sm:items-center">
                            <Heading as="h3" fontSize={windowWidth && windowWidth >=640 ? "25" : "20"} color={themeColor}>{title}</Heading>
                            <Badge className="text-lg w-fit">2023 - </Badge>
                        </div>
                        <div className="rounded-md px-2 py-1 text-white font-semibold flex items-center gap-x-1"
                            style={{ backgroundColor: themeColor }}
                        >
                            <p>New</p>
                            <MdStars className="h-[1.2rem] w-[1.2rem]"/>
                        </div>
                    </div>
                    <p className="font-semibold text-slate-500 text-bold sm:w-[65%] w-[80%]">{author}</p>
                    <div className="py-5">
                        <p className="text-justify">{description}</p>
                    </div>
                   
                   {/* Place to put all sources and tags */}

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
                        <Link href={linkSource} className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3" target="_blank">{SourceTitle}</Link>
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
 
export default DashBoardForAdmin;