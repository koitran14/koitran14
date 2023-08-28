"use client"

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";


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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                            <Heading as="h3" fontSize={25} color={themeColor}>{title}</Heading>
                            <Badge className="text-lg">2023 - </Badge>
                        </div>
                        <div className="rounded-md px-2 py-1 text-white font-semibold flex items-center gap-x-1"
                            style={{ backgroundColor: themeColor }}
                        >
                            <p>New</p>
                            <MdStars className="h-[1.2rem] w-[1.2rem]"/>
                        </div>
                    </div>
                    <p className="font-semibold text-slate-500 text-bold w-[65%]">{author}</p>
                    <div className="py-5">
                        <p className="text-justify">{description}</p>
                    </div>
                   
                   {/* Place to put all sources and tags */}

                    {/* PLATFORM */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>PLATFORM</Meta>
                        </div>
                        <p className="col-span-5">Windows/macOS/Linux</p>
                    </MetaPlace>

                    {/* STACK */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>STACK</Meta>
                        </div>
                        <p className="col-span-5">{stack}</p>
                    </MetaPlace>

                    {/* GITHUB SOURCES */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>SOURCE</Meta>
                        </div>
                        <Link href={linkSource} className="col-span-5" target="_blank">{SourceTitle}</Link>
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