import { Heading, Link } from "@chakra-ui/react";
import { ChevronRight  } from "lucide-react";

interface AddressProps {
    prevLink: string;
    prevTitle: string;
    currentTitle: string;
}

const Address: React.FC<AddressProps> = ({
    prevLink,
    prevTitle,
    currentTitle
}) => {
    return (
        <div className="flex items-center gap-x-1 px-4 py-1">
            <Link 
                className="flex items-center font-bold"
                href={prevLink}
            >
                <Heading as="h3" fontSize={17} >{prevTitle}</Heading>
            </Link >
            <div className="flex items-center text-slate-400">
                <ChevronRight  />
                <Heading as="h3" fontSize={17} >{currentTitle}</Heading>
            </div>
    </div>
    );
}
 
export default Address;