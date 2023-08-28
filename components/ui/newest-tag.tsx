import { useColorModeValue } from "@chakra-ui/react";
import { MdStars } from "react-icons/md";

const NewestTag = () => {
    return (
        <div className="absolute h-[60px] -top-7 left-[0.8px] -z-10 rounded-md"
            style={{ backgroundColor: useColorModeValue( '#f97316', '#ec4899')}}
        >
            <div className="flex items-center gap-x-1 text-sm font-semibold text-white p-1 ">
                <p>New</p>
                <MdStars className="h-[1.2rem] w-[1.2rem]"/>
            </div>
        </div>
    );
}
 
export default NewestTag;