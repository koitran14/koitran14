/* eslint-disable react/no-unescaped-entities */
"use client"

import {  Button,  Heading, Image,  Link, useColorModeValue } from "@chakra-ui/react";
import Section from "@/components/section";
import Paragraph from "@/components/paragraph";
import {  ChevronRightIcon, InstagramIcon, Mail } from "lucide-react";
import { BioDesc, BioSection, BioYear } from "@/components/bio";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { IoLogoGithub } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Home() {

  const color = useColorModeValue('text-slate-500', 'text-slate-400');

  return (
    <Section delay={0}>
      <div className="py-4 ">
          <div className="flex md:flex-row gap-6 items-center pb-8 flex-col-reverse md:text-left text-center ">
              <div className="flex flex-col w-full">
                <Heading as="h2" variant="page-title" className="md:py-5 py-3 flex items-center justify-center md:justify-start gap-1" >
                  Hi, I'm Koi! 
                  <div className="animate-bounce">🥳</div>
                </Heading>
                <p className={`${color} font-medium md:text-justify sm:w-[80%] md:w-full text-center self-center`}> Being a Computer Science senior at International University and a Saigonese full-stack Web Application developer, welcome to my portfolio. 💖</p>
              </div>
              <div className="px-2 py-4 items-center justify-center flex relative group">
                  <Image 
                    borderColor="whiteAlpha.800" 
                    borderStyle="solid" 
                    maxWidth="200px"
                    display="inline-block"
                    src="/images/koitran.jpg"
                    alt="Profile"
                    className="md:rounded-t-full md:rounded-b-none scale-105 rounded-full border-slate-500 border-4 group-hover:scale-110 group-hover:border-blue-600 transition-all ease-in-out duration-200"
                  /> 
                  
                  <motion.div className="scale-0 group-hover:flex group-hover:scale-110 transition-all ease-in-out duration-300 group-hover:animate-bounce absolute top-4 right-4 
                    text-3xl w-12 h-12 bg-white p-1 border-slate-400 border-2 rounded-full items-center justify-center"
                  >
                    👋
                  </motion.div>

              </div>
          </div>
          
          <Section delay={0.2}>
            <Heading as="h3" variant="section-title">About me</Heading>
            <Paragraph>
              As a senior student at International University,
              I have a huge passion on web application development, combining technical expertise with an artistic touch. 
              Explore my diverse portfolio and join me in shaping a meaningful impact in the world of web development and 
              beyond. Visit my {' '}
              <Link
                href="/works/"
              >
                works
              </Link>
              {' '} now.
            </Paragraph>
            
            <div className="flex pt-9 pb-3 items-center justify-center">
              <a href="/works">
                <Button 
                  variant="solid" 
                  borderWidth={2} 
                  borderRadius={0} 
                  rightIcon={<ChevronRightIcon />} 
                  _hover={{ background: "orange", color: "#000000", transform:"scale(1.05)" }}
                >
                  My works
                </Button>
              </a>
            </div>

            <Section delay={0.4}>
            <Heading as="h3" variant="section-title">Bio</Heading>
              <BioSection>
                <BioYear>2003</BioYear>
                <BioDesc>Born in My Tho (Tien Giang), Viet Nam.</BioDesc>
              </BioSection>
              <BioSection>
                <BioYear>2018 to 2021</BioYear>
                <BioDesc>Student of Tien Giang High School for The Gifted.</BioDesc>
              </BioSection>
              <BioSection>
                <BioYear>2021 to present</BioYear>
                <BioDesc>Pursuing a bachelor's degree in computer science at International University.</BioDesc>
              </BioSection>
            </Section>

            <Section delay={0.6}>
              <Heading as="h3" variant="section-title">I <span className="text-red-500">♥</span></Heading>
                <Paragraph>
                  
                  Art, Music,{' '}
                  <Link
                    href="/gallery"
                  >
                    Photography
                  </Link>
                  , Pokémon, and {' '}
                  <Link
                    href="/works"
                  >
                    Coding
                  </Link>
                  . 🦄
                </Paragraph>
            </Section>

            <Section delay={0.8}>
              <Heading as="h3" variant="section-title">Social</Heading>
              <MetaPlace>
                <div className="col-start-1 flex items-center">
                  <Meta>INSTAGRAM</Meta>
                </div>
                <Link className="sm:col-span-5 sm:col-start-2 col-start-3" href="https://www.instagram.com/khoitran1403/">
                  <p className="flex gap-x-2 items-center w-fit px-2 rounded-md"><InstagramIcon className="h-[1.2rem] w-[1.2rem]"/> @khoitran1403</p>
                </Link>
              </MetaPlace>

              <MetaPlace>
                <div className="col-start-1 flex items-center">
                  <Meta>GITHUB</Meta>
                </div>
                <Link className="sm:col-span-5 sm:col-start-2 col-start-3" href="https://github.com/koitran14">
                  <p className="flex gap-x-2 items-center w-fit px-2 rounded-md"><IoLogoGithub className="h-[1.2rem] w-[1.2rem]"/> @koitran14 </p>
                </Link>
              </MetaPlace>

              <MetaPlace>
                <div className="col-start-1 flex items-center">
                  <Meta>GMAIL</Meta>
                </div>
                <Link className="sm:col-span-5 sm:col-start-2 col-start-3" href="#">
                  <p className="flex gap-x-2 items-center w-fit px-2 rounded-md"><Mail className="h-[1.2rem] w-[1.2rem]"/> tndkhoi.work@gmail.com</p>
                </Link>
              </MetaPlace>

            </Section>
          </Section>
      </div>
    </Section>
);
}
