"use client";

import Section from "@/components/section";
import { Meta, MetaPlace } from "@/components/ui/meta";
import { Badge, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";
import Gallery from "@/components/ui/gallery";
import Address from "@/components/ui/address";
import { useEffect, useState } from "react";
import { works } from "@/data/works";
import { useParams } from "next/navigation";

const AlgoVisualizerPage = () => {
  const params = useParams();
  const themeColor = useColorModeValue("#f97316", "#22D3EE");

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

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

  const page = works.find((work) => work.id === params.pageID);

  return (
    <Section>
      {page ? (
        <>
          <Address
            prevLink="/works"
            prevTitle="Works"
            currentTitle={page.title}
          />
          <div>
            <div className="pb-5 pt-2">
              <Image
                src={page.headingImg}
                alt={page.title}
                className="rounded-lg"
              />
            </div>
            <div>
              {/* Heading and description */}
              <div className="flex items-start justify-between ">
                <div className="flex gap-x-3 flex-col gap-y-1 justify-start w-full">
                  <Badge className="text-lg w-fit">{page.publishYear}</Badge>
                  <Heading
                    className="max-w-[98%]"
                    as="h3"
                    fontSize={windowWidth && windowWidth >= 640 ? "25" : "22"}
                    color={themeColor}
                  >
                    {page.title}
                  </Heading>
                </div>
                {page.newest && (
                  <div
                    className="rounded-md px-2 py-1 text-white font-semibold flex items-center gap-x-1"
                    style={{ backgroundColor: themeColor }}
                  >
                    <p>New</p>
                    <MdStars className="h-[1.2rem] w-[1.2rem]" />
                  </div>
                )}
              </div>
              <p className="font-semibold text-slate-500 text-bold w-[70%]">
                {page.author}
              </p>
              <div className="py-5">
                <p className="text-justify">{page.description}</p>
              </div>

              {/* Place to put all sources and tags */}
              {/* WEBSITE */}
              {page.linkAttached.linkdemo && (
                <MetaPlace>
                  <div className="col-start-1 ">
                    <Meta>WEBSITE</Meta>
                  </div>
                  <Link
                    href={page.linkAttached.linkdemo}
                    target="_blank"
                    className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3"
                  >
                    {page.linkAttached.linkdemo}
                  </Link>
                </MetaPlace>
              )}

              {/* PLATFORM */}
              <MetaPlace>
                <div className="col-start-1 ">
                  <Meta>PLATFORM</Meta>
                </div>
                <p className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">
                  {page.platform}
                </p>
              </MetaPlace>

              {/* STACK */}
              <MetaPlace>
                <div className="col-start-1 ">
                  <Meta>STACK</Meta>
                </div>
                <p className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3">
                  {page.stack}
                </p>
              </MetaPlace>

              {/* GITHUB SOURCES */}
              <MetaPlace>
                <div className="col-start-1 ">
                  <Meta>SOURCE</Meta>
                </div>
                <Link
                  href={page.linkAttached.linkSource}
                  className="sm:col-span-5 sm:col-start-2 col-span-4 col-start-3"
                >
                  {page.linkAttached.SourceTitle}
                </Link>
              </MetaPlace>
            </div>
          </div>

          {page.demoVideo && (
            <Heading
              as="h3"
              fontSize={18}
              variant="section-title"
              className=" py-4"
            >
              Demo Video
            </Heading>
          )}
          {page.demoVideo && page.demoVideo.includes("youtube") && (
            <iframe
              width="100%"
              height="280px"
              src={page.demoVideo.replace("watch?v=", "embed/")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mt-4"
            ></iframe>
          )}
          {page.demoVideo && !page.demoVideo.includes("youtube") && (
            <video controls className="w-full h-auto">
              <source src={page.demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div>
            <Heading
              as="h3"
              fontSize={18}
              variant="section-title"
              className=" py-4"
            >
              Screenshots
            </Heading>
            <Gallery images={page.images} />
          </div>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          404: NOT FOUND
        </div>
      )}
    </Section>
  );
};

export default AlgoVisualizerPage;
