import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Field, ImageType } from "@/type";
import { Button } from "@chakra-ui/react";


interface FilterProps {
    data: Field[];
    valueKey: string;
    images: ImageType[];
    setFilteredImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
}

const Filter: React.FC<FilterProps> = ({
    data,
    valueKey,
    images,
    setFilteredImages
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
            setFilteredImages(images); 
            // Reset filter if the same activity is clicked again
        } else {
            const filteredImages = images.filter((img) => img.alt === id);
            setFilteredImages(filteredImages);
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });

        router.push(url);
    }

    return (
        <div className="grid grid-cols-2 gap-3 items-center justify-center overflow-hidden">
            {data.map((filter) => (
                <Button
                    key={filter.id}
                    variant={"outline"}
                    borderWidth={2}
                    size={"lg"}
                    bg={selectedValue === filter.id ? "white" : "transparent"}
                    color={selectedValue === filter.id ? "black" : "white"}
                    onClick={() => onClick(filter.id)}
                    _hover={{opacity: 0.8 }}
                >
                    {filter.id}
                </Button>
            ))}
        </div>
    );
}

export default Filter;
