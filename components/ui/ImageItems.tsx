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
            {/* numeric alts ("1", "2") are just ordering, not captions */}
            {image.alt && !/^\d+$/.test(image.alt) && (
                <>
                    {/* soft fade so the caption reads on bright screenshots; on hover devices it only shows on hover */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />
                    <p className="absolute inset-x-0 bottom-0 px-3 py-2.5 text-xs font-medium leading-snug text-white first-letter:uppercase pointer-events-none transition-all duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0">
                        {image.alt}
                    </p>
                </>
            )}
        </div>
    );
}

export default ImageItems;