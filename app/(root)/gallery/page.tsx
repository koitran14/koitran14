"use client"

import Section from "@/components/section";
import Gallery from "@/components/ui/gallery";
import { useColorModeValue } from "@chakra-ui/react";
import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";

import galleryImgs from "@/data/galleryData";
import galleryActivity from "@/data/galleryActivities";

const GalleriesPage = () => {
    const [filteredImages, setFilteredImages] = useState(galleryImgs);
    const [activeTag, setActiveTag] = useState("all");

    const textColor = useColorModeValue("black", "white");
    const subTextColor = useColorModeValue("gray.500", "gray.400");
    const borderColor = useColorModeValue("border-gray-200", "border-white/10");

    // Fix Tailwind dark-mode overrides falling back to light color in Chakra wrapper
    const tagBorderColor = useColorModeValue("border-zinc-300", "border-white/30");
    const tagTextColor = useColorModeValue("text-zinc-700", "text-white/80");
    const tagHoverBg = useColorModeValue("hover:bg-zinc-100", "hover:bg-white/10");

    const handleFilter = (tag: string) => {
        setActiveTag(tag);
        if (tag === "all") {
            setFilteredImages(galleryImgs);
        } else {
            setFilteredImages(galleryImgs.filter(img => img.alt && img.alt.includes(tag)));
        }
    }

    const highlightTags = ["all", ...galleryActivity.map(a => a.id)];

    return (
        <Section delay={0}>
            <div className="max-w-5xl mx-auto pt-8 md:pt-16">
                
                {/* Minimalist Editorial Header */}
                <div className="max-w-2xl mb-8 md:mb-12">
                    <h1 
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text animate-gradient pb-1"
                        style={{ backgroundImage: 'linear-gradient(to right, #38bdf8, #818cf8, #c084fc, #e879f9, #f472b6, #fb7185, #facc15)' }}
                    >
                        Visual Diary.
                    </h1>
                    <p className={`text-sm md:text-base ${subTextColor} leading-relaxed`}>
                        A curated collection of moments, aesthetics, and visual experiments. 
                        Exploring the intersection of nature, daily life, and creative persona.
                    </p>
                    <a href="https://github.com/koitran14" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-medium text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mt-4 md:mt-6 w-fit">
                        <LinkIcon size={16} /> @koitran14
                    </a>
                </div>

                {/* Pure Typography Filters */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8 md:mb-10">
                    {highlightTags.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => handleFilter(tag)} 
                            className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm capitalize tracking-wide transition-all duration-300 border 
                            ${activeTag === tag 
                                ? 'text-white font-bold border-transparent shadow-lg animate-gradient drop-shadow-md scale-105' 
                                : `bg-transparent font-medium ${tagBorderColor} ${tagTextColor} ${tagHoverBg}`}`}
                            style={activeTag === tag ? { backgroundImage: 'linear-gradient(to right, #38bdf8, #818cf8, #c084fc, #e879f9, #f472b6, #fb7185, #facc15)' } : {}}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Grid (Waterfall) */}
                <div className="pt-2">
                    <Gallery images={filteredImages} />
                </div>

            </div>
        </Section>
    );
};

export default GalleriesPage;