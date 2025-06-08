/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Button,
  Heading,
  Image,
  Link,
  useColorModeValue,
  Box,
  Badge,
  Text,
  VStack,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import Section from "@/components/section";
import Paragraph from "@/components/paragraph";
import {
  ChevronRightIcon,
  InstagramIcon,
  Mail,
  Briefcase,
  Calendar,
  ArrowUpRight,
  Settings,
} from "lucide-react";
import { BioDesc, BioSection, BioYear } from "@/components/bio";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { IoLogoGithub } from "react-icons/io5";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Experience Card with Chakra Theme
const ExperienceCard = ({
  title,
  company,
  companyLink,
  period,
  startDate,
  endDate,
  description,
  skills,
  isCurrent = false,
  delay = 0,
  value,
}: any) => {
  const primaryColor = useColorModeValue("orange.400", "pink.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const titleColor = useColorModeValue("gray.800", "gray.200");
  const expandedBg = useColorModeValue("gray.50", "gray.750");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <AccordionItem
        value={value}
        className="border-0 mb-3 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Box
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
          borderRadius="xl"
        >
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <Box w="full">
              {/* Header with badge and settings icon */}
              <Flex justify="space-between" align="flex-start" mb={3}>
                <Badge
                  bg={primaryColor}
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  {period}
                </Badge>
              </Flex>

              {/* Company and Title */}
              <VStack align="flex-start" spacing={1} mb={4}>
                <HStack
                  spacing={2}
                  align="center"
                  w="full"
                  justify="flex-start"
                >
                  <Text fontSize="sm" color={textColor} fontWeight="500">
                    @<span className="font-bold">{company}</span>
                  </Text>
                  {companyLink && (
                    <Link
                      href={companyLink}
                      isExternal
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight size={12} color="currentColor" />
                    </Link>
                  )}
                </HStack>
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  color={titleColor}
                  lineHeight="short"
                  textAlign="left"
                >
                  {title}
                </Text>
              </VStack>

              {/* Timeline Bar */}
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="xs" color={textColor} fontWeight="500">
                    {startDate}
                  </Text>
                  <Text fontSize="xs" color={textColor} fontWeight="500">
                    {isCurrent ? "Present" : endDate}
                  </Text>
                </Flex>
                <Box position="relative">
                  <Box
                    h="2px"
                    bg="gray.200"
                    _dark={{ bg: "gray.600" }}
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    h="2px"
                    w="100%"
                    bg={primaryColor}
                    borderRadius="full"
                  />
                  {/* Timeline dots */}
                  <Box
                    position="absolute"
                    left="0"
                    top="-2px"
                    w="6px"
                    h="6px"
                    bg={primaryColor}
                    borderRadius="full"
                  />
                  <Box
                    position="absolute"
                    right="0"
                    top="-2px"
                    w="6px"
                    h="6px"
                    bg={isCurrent ? primaryColor : "gray.300"}
                    borderRadius="full"
                  />
                </Box>
              </Box>
            </Box>
          </AccordionTrigger>

          <AccordionContent className="px-0 pb-0 pt-0">
            <Box bg={expandedBg} px={5} pb={5} pt={2}>
              <VStack align="flex-start" spacing={4} mt={2}>
                {/* Description */}
                <Box w="full">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color={titleColor}
                    mb={2}
                  >
                    Responsibilities
                  </Text>
                  <VStack align="flex-start" spacing={2}>
                    {description.map((item: string, index: number) => (
                      <Flex key={index} align="flex-start" gap={2}>
                        <Box
                          w="4px"
                          h="4px"
                          bg={primaryColor}
                          borderRadius="full"
                          mt="6px"
                          flexShrink={0}
                        />
                        <Text
                          fontSize="sm"
                          color={textColor}
                          lineHeight="relaxed"
                        >
                          {item}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                {/* Skills */}
                <Box w="full">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color={titleColor}
                    mb={2}
                  >
                    Technologies
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        borderColor={primaryColor}
                        color={primaryColor}
                        fontSize="xs"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </VStack>
            </Box>
          </AccordionContent>
        </Box>
      </AccordionItem>
    </motion.div>
  );
};

export default function Home() {
  const color = useColorModeValue("text-slate-500", "text-slate-400");
  const titleTheme = useColorModeValue("text-orange-500", "text-pink-500");

  const experiences = [
    {
      title: "Software Engineer",
      company: "Delta Cognition",
      companyLink: "https://www.linkedin.com/company/delta-cognition/",
      period: "2024-Present",
      startDate: "Jun",
      endDate: "Present",
      isCurrent: true,
      description: [
        "Developed and maintained scalable web applications using React, Next.js, and TypeScript",
        "Collaborated with cross-functional teams to deliver high-quality software solutions",
        "Enhanced user experience through responsive design and performance optimization",
        "Participated in code reviews and maintained clean, well-documented codebases",
      ],
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    },
  ];

  return (
    <Section delay={0}>
      <div className="py-4">
        <div className="flex md:flex-row gap-6 items-center pb-8 flex-col-reverse md:text-left text-center ">
          <div className="flex flex-col w-full">
            <Heading
              as="h2"
              variant="page-title"
              className="md:py-5 py-3 flex items-center justify-center md:justify-start gap-1"
            >
              Hi, I'm Koi!
              <div className="animate-bounce">🥳</div>
            </Heading>
            <p
              className={`${color} font-medium md:text-justify sm:w-[80%] md:w-full text-center self-center`}
            >
              {" "}
              Being a Computer Science senior at International University and a
              Saigonese full-stack Web Application developer, welcome to my
              portfolio. 💖
            </p>
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

            <motion.div
              className="scale-0 group-hover:flex group-hover:scale-110 transition-all ease-in-out duration-300 group-hover:animate-bounce absolute top-4 right-4 
                    text-3xl w-12 h-12 bg-white p-1 border-slate-400 border-2 rounded-full items-center justify-center"
            >
              👋
            </motion.div>
          </div>
        </div>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            About me
          </Heading>
          <Paragraph>
            As a senior student at International University, I have a huge
            passion on web application development, combining technical
            expertise with an artistic touch. Explore my diverse portfolio and
            join me in shaping a meaningful impact in the world of web
            development and beyond. Visit my <Link href="/works/">works</Link>{" "}
            now.
          </Paragraph>

          <div className="flex pt-9 pb-3 items-center justify-center">
            <a href="/works">
              <Button
                variant="solid"
                borderWidth={2}
                borderRadius={0}
                rightIcon={<ChevronRightIcon />}
                _hover={{
                  background: "orange",
                  color: "#000000",
                  transform: "scale(1.05)",
                }}
              >
                My works
              </Button>
            </a>
          </div>

          <Section delay={0.3}>
            <Heading
              as="h3"
              variant="section-title"
              className={cn("flex items-center gap-2 mb-6", titleTheme)}
            >
              <Briefcase className="h-5 w-5 " />
              Experience
            </Heading>

            <Accordion type="single" collapsible className="w-full">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  {...exp}
                  value={`item-${index}`}
                  delay={0.1 * index}
                />
              ))}
            </Accordion>
          </Section>

          <Section delay={0.4}>
            <Heading
              as="h3"
              variant="section-title"
              className={cn("flex items-center gap-2",
                titleTheme
              )}
            >
              <Calendar className="h-5 w-5 " />
              Bio
            </Heading>

            <Box mt={6}>
              <BioSection
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <BioYear>2003</BioYear>
                <BioDesc>Born in My Tho (Tien Giang), Viet Nam.</BioDesc>
              </BioSection>

              <BioSection
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <BioYear>2018 - 2021</BioYear>
                <BioDesc>
                  Student of Tien Giang High School for The Gifted.
                </BioDesc>
              </BioSection>

              <BioSection
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <BioYear>2021 - present</BioYear>
                <BioDesc>
                  Pursuing a bachelor's degree in computer science at
                  International University.
                </BioDesc>
              </BioSection>
            </Box>
          </Section>

          <Section delay={0.6}>
            <Heading as="h3" variant="section-title">
              I <span className="text-red-500">♥</span>
            </Heading>
            <Paragraph>
              Art, Music, <Link href="/gallery">Photography</Link>, Pokémon, and{" "}
              <Link href="/works">Coding</Link>. 🦄
            </Paragraph>
          </Section>

          <Section delay={0.8}>
            <Heading as="h3" variant="section-title">
              Social
            </Heading>
            <MetaPlace>
              <div className="col-start-1 flex items-center">
                <Meta>INSTAGRAM</Meta>
              </div>
              <Link
                className="sm:col-span-5 sm:col-start-2 col-start-3"
                href="https://www.instagram.com/khoitran1403/"
              >
                <p className="flex gap-x-2 items-center w-fit px-2 rounded-md">
                  <InstagramIcon className="h-[1.2rem] w-[1.2rem]" />{" "}
                  @khoitran1403
                </p>
              </Link>
            </MetaPlace>

            <MetaPlace>
              <div className="col-start-1 flex items-center">
                <Meta>GITHUB</Meta>
              </div>
              <Link
                className="sm:col-span-5 sm:col-start-2 col-start-3"
                href="https://github.com/koitran14"
              >
                <p className="flex gap-x-2 items-center w-fit px-2 rounded-md">
                  <IoLogoGithub className="h-[1.2rem] w-[1.2rem]" /> @koitran14{" "}
                </p>
              </Link>
            </MetaPlace>

            <MetaPlace>
              <div className="col-start-1 flex items-center">
                <Meta>GMAIL</Meta>
              </div>
              <Link
                className="sm:col-span-5 sm:col-start-2 col-start-3"
                href="#"
              >
                <p className="flex gap-x-2 items-center w-fit px-2 rounded-md">
                  <Mail className="h-[1.2rem] w-[1.2rem]" />{" "}
                  tndkhoi.work@gmail.com
                </p>
              </Link>
            </MetaPlace>
          </Section>
        </Section>
      </div>
    </Section>
  );
}
