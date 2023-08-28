"use client"

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";


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
                        <Link href={linkdemo} target="_blank" className="col-span-5">{linkdemo}</Link>
                    </MetaPlace>

                    {/* PLATFORM */}
                    <MetaPlace>
                        <div className="col-start-1 ">
                            <Meta>PLATFORM</Meta>
                        </div>
                        <p className="col-span-5">Windows/macOS/Linux/iOS/Android</p>
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
                <Heading as="h3" fontSize={18} variant="section-title" className="py-4">Screenshots</Heading>
                <Gallery images={images} />
            </div>
       </Section>
    );
}
 
export default DashBoardForAdmin;