import { Image } from "@chakra-ui/react";
import { ImageType } from "@/schema/type";

interface GalleryProp {
    image: ImageType;
    onClick: () => void;
}

const ImageItems: React.FC<GalleryProp> = ({
    image,
    onClick
}) => {
    return (
        <div className="group relative w-full overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-lg md:rounded-xl mb-2 md:mb-4 break-inside-avoid shadow-sm hover:shadow-xl transition-all border border-black/5 dark:border-white/10" onClick={onClick}>
            <Image
                key={image.href}
                src={image.href}
                alt={image.alt}
                w="100%"
                className="transition-transform duration-500 ease-out group-hover:scale-110 origin-center"  
                loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Animated Title */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none flex items-center justify-between">
                <span className="text-white/95 text-sm md:text-base font-normal tracking-[0.2em] lowercase drop-shadow-md">
                    {image.alt}
                </span>
            </div>
        </div>
    );
}

export default ImageItems;