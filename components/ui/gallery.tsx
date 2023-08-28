"use client"

import ImageItems from "./ImageItems";

import { ImageType } from "@/type";

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({
    images
}) => {
    return(
        <div className="columns-2 gap-3">
            {images.map((image) => (
                <ImageItems 
                    key={image.href}
                    image={image}
                />
            ))}
        </div>
    )
}

export default Gallery;