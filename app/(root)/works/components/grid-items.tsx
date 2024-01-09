import Section from "@/components/section";
import NewestTag from "@/components/ui/newest-tag";
import { Heading, Image, useColorModeValue } from "@chakra-ui/react";

interface GridItemsProps {
    children: React.ReactNode,
    id?: string,
    title?:  string,
    author?: string,
    thumbnail: string,
    newest?: boolean
}

const GridItems: React.FC<GridItemsProps> = ({
    children,
    id,
    title,
    author,
    thumbnail, 
    newest 
}) => {
    return (
        <Section>
            <div className=" cursor-pointer rounded-xl relative drop-shadow-xl hover:scale-[1.02] transform ease-in-out duration-300" >
                {newest &&(
                    <NewestTag />
                )}
                <a href={`/works/${id}`}>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center ">
                            <Image 
                                src={thumbnail}
                                alt={title}
                                className="rounded-xl"
                                placeholder="blur"
                                loading="lazy"
                            />
                        </div>
                        <div className=" w-full items-center pt-2 justify-center" >
                            <div className="py-2 justify-center items-center">
                                <Heading 
                                    as="h3" className="font-bold items-center text-center"
                                    style={{ color: useColorModeValue( '#f97316', '#ec4899')}}
                                    fontSize={19}
                                >
                                    {title}
                                </Heading>
                                <div className="justify-center flex">
                                    <p className="text-sm font-semibold text-center w-[60%] text-slate-500">
                                        {author}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-center md:px-3 px-5 line-clamp-3">
                                {children}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </Section>
    );
}
 
export default GridItems;


