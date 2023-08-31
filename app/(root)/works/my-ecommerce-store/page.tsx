"use client"

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";
import { useEffect, useState } from "react";


const title = "Pisces: The E-shop";
const author = "Trần Ngọc Đăng Khôi";
const headingImg="/images/works/my-ecommerce-store/image.png"

const linkdemo = "https://my-ecommerce-store.vercel.app/";
const linkSource = "https://github.com/koitran14/My-Ecommerce-Store";
const SourceTitle = "Pisces.io: My Ecommmerce Store | Github";

const stack = "NextJS, Tailwind, PrismaDB, Stripe.";

const images = [{
    href: "/images/works/my-ecommerce-store/1.jpeg",
},
{
    href: "/images/works/my-ecommerce-store/3.png",
},
{
    href: "/images/works/my-ecommerce-store/2.png",
},
{
    href: "/images/works/my-ecommerce-store/4.png",
},
{
    href: "/images/works/my-ecommerce-store/5.png",
},
{
    href: "/images/works/my-ecommerce-store/6.png",
},
]

const DashBoardForAdmin = () => {
    const themeColor = useColorModeValue( '#f97316', '#22D3EE');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
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
                            <Heading as="h3" fontSize={windowWidth >=640 ? "25" : "20"} color={themeColor}>{title}</Heading>
                            <Badge className="text-lg w-fit">2023 - </Badge>
                        </div>
                        <div className="rounded-md px-2 py-1 text-white font-semibold flex items-center gap-x-1"
                            style={{ backgroundColor: themeColor }}
                        >
                            <p>New</p>
                            <MdStars className="h-[1.2rem] w-[1.2rem]"/>
                        </div>
                    </div>
                    <p className="font-semibold text-slate-500 text-bold w-[80%]">{author}</p>
                    <div className="py-5">
                        <p className="text-justify">
                            This is my own store (pisces.io) served for my practice in learning full-stack web development and connected to my Dashboard manager, which called {' '}
                            <Link href="/works/store-dashboard">Dashboard for Store</Link>.
                        </p>
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
                        <p className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">Windows/macOS/Linux/iOS/Android</p>
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
                <Heading as="h3" fontSize={18} variant="section-title" className="py-4">Screenshots</Heading>
                <Gallery images={images} />
            </div>
       </Section>
    );
}
 
export default DashBoardForAdmin;