"use client"

import { Image, useDisclosure } from "@chakra-ui/react";
import { ImageType } from "@/type";
import Modal from "@/components/ui/modal";
import Section from "../section";

interface GalleryProp {
    image: ImageType;
}

const ImageItems: React.FC<GalleryProp> = ({
    image
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    

    return (
        <Section>
            <div className="h-full w-full">
                <Image
                    key={image.href}
                    src={image.href}
                    alt={image.alt}
                    className="rounded-md hover:scale-105 transform ease-in-out duration-300 shadow-lg"  
                    onClick={onOpen}
                />
                    {isOpen && (
                        <div>
                            <Modal 
                                open={isOpen}
                                onClose={onClose}
                            >
                                <div className="relative">
                                    <Image
                                        key={image.href} 
                                        src={image.href}
                                        alt={image.alt}
                                        onClick={onOpen}
                                        className="max-h-[90%]"
                                    />
                                    {image.alt !== undefined && (
                                        <div className="absolute top-3 left-4">
                                            <p className="text-slate-200 px-3 py-1 flex  w-fit rounded-full">#{image.alt}</p>                            
                                        </div>
                                    )}
                                </div>
                            </Modal>
                        </div>
                    )}
            </div>
      </Section>
    );
}
 
export default ImageItems;