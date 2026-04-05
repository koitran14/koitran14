"use client"

import ImageItems from "./ImageItems";
import { ImageType } from "@/schema/type";
import { useState, Fragment, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({
    images
}) => {
    const [shuffledImages, setShuffledImages] = useState<ImageType[]>(images);

    useEffect(() => {
        const arr = [...images];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setShuffledImages(arr);
    }, [images]);

    const [isOpen, setIsOpen] = useState(false);
    const [activeImgIdx, setActiveImgIdx] = useState(0);
    const [direction, setDirection] = useState(0); 

    const openModal = (idx: number) => {
        setActiveImgIdx(idx);
        setDirection(0);
        setIsOpen(true);
    }
    const onClose = () => setIsOpen(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection(1);
        setActiveImgIdx(prev => (prev + 1) % shuffledImages.length);
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection(-1);
        setActiveImgIdx(prev => (prev - 1 + shuffledImages.length) % shuffledImages.length);
    }

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95
        })
    };

    if (!shuffledImages.length) return null;

    const activeImageItem = shuffledImages[activeImgIdx];

    return(
        <>
            <div className="columns-2 md:columns-3 gap-2 md:gap-4 w-full mx-auto">
                {shuffledImages.map((image, idx) => (
                    <ImageItems 
                        key={image.href + idx}
                        image={image}
                        onClick={() => openModal(idx)}
                    />
                ))}
            </div>

            <Transition show={isOpen} appear as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xl" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-0 select-none">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative w-full h-full flex flex-col items-center justify-center">
                                {/* Close Button */}
                                <button 
                                    onClick={onClose} 
                                    className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white z-50 p-2 transition-colors cursor-pointer"
                                >
                                    <X size={32} strokeWidth={1.5} />
                                </button>
                                
                                {/* Navigation overlay areas for large hit-box */}
                                <div 
                                    onClick={prevImage} 
                                    className="absolute inset-y-0 left-0 w-[20vw] z-40 flex items-center justify-start pl-2 md:pl-8 group/nav cursor-pointer"
                                >
                                    <div className="bg-white/0 md:group-hover/nav:bg-white/10 p-2 rounded-full text-white/30 md:text-white/50 md:group-hover/nav:text-white backdrop-blur-md transition-all">
                                        <ChevronLeft size={28} strokeWidth={1.5} className="md:w-9 md:h-9" />
                                    </div>
                                </div>

                                <div 
                                    onClick={nextImage} 
                                    className="absolute inset-y-0 right-0 w-[20vw] z-40 flex items-center justify-end pr-2 md:pr-8 group/nav cursor-pointer"
                                >
                                    <div className="bg-white/0 md:group-hover/nav:bg-white/10 p-2 rounded-full text-white/30 md:text-white/50 md:group-hover/nav:text-white backdrop-blur-md transition-all">
                                        <ChevronRight size={28} strokeWidth={1.5} className="md:w-9 md:h-9" />
                                    </div>
                                </div>

                                {/* Animated Image View */}
                                <div className="relative w-[100vw] h-[85vh] flex items-center justify-center overflow-hidden">
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.div
                                            key={activeImgIdx}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.15 }
                                            }}
                                            className="absolute flex items-center justify-center w-full h-full px-[5vw]"
                                        >
                                            <ChakraImage
                                                src={activeImageItem?.href}
                                                alt={activeImageItem?.alt}
                                                className="max-h-full max-w-full object-contain rounded-sm select-none shadow-2xl"
                                                draggable={false}
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Minimalist Editorial Tag at Top Left */}
                                {activeImageItem?.alt && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={activeImageItem.alt}
                                        className="absolute top-6 left-6 md:top-8 md:left-10 z-50 pointer-events-none flex items-center md:gap-4 gap-3 mix-blend-difference"
                                    >
                                        <div className="h-[1.5px] w-6 md:w-10 bg-white/80" />
                                        <span className="text-white/95 text-xs md:text-sm font-normal tracking-[0.3em] lowercase">
                                            {activeImageItem.alt}
                                        </span>
                                    </motion.div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Gallery;