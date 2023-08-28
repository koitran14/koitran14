"use client"

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";


const title = "Dashboard for Admin";
const author = "Trần Ngọc Đăng Khôi";
const description = "This is a web that supports for admin in business management. It is also a creation of my practice in learning of NextJS, TailwindCSS worked with Database MySQL, Prisma and PlanetScale.";
const headingImg="/images/works/dashboard-for-admin/image.png"

const linkdemo = "https://store-dash-board-for-admin.vercel.app/";
const linkSource = "https://github.com/koitran14/Store-DashBoard-For-Admin";
const SourceTitle = "Store DashBoard For Admin | Github";

const stack = "NextJS, Tailwind, PrismaDB, Stripe.";

const images = [{
    href: "/images/works/dashboard-for-admin/1.png",
},
{
    href: "/images/works/dashboard-for-admin/2.png",
},
{
    href: "/images/works/dashboard-for-admin/3.png",
},
{
    href: "/images/works/dashboard-for-admin/4.png",
},
{
    href: "/images/works/dashboard-for-admin/5.png",
    alt: "1"
},
{
    href: "/images/works/dashboard-for-admin/2.jpeg",
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
                    <p className="font-semibold w-[70%] text-slate-500"
                    >{author}</p>
                    <div className="py-5">
                        <p className="text-justify">{description}</p>
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
                <Heading as="h3" fontSize={18} variant="section-title" className=" py-4">Screenshots</Heading>
                <Gallery images={images} />
            </div>

       </Section>
    );
}
 
export default DashBoardForAdmin;