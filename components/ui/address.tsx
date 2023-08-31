import { Heading, Link } from "@chakra-ui/react";
import { ChevronRight  } from "lucide-react";
import { useEffect, useState } from "react";

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
    const [windowWidth, setWindowWidth] = useState<number | null >(null);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      // Set initial width after component mounts
      setWindowWidth(window.innerWidth);
  
      // Add resize event listener
      window.addEventListener("resize", handleResize);
  
      // Clean up event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
        <div className="flex items-center gap-x-1 sm:px-4 px-2 py-1">
            <Link 
                className="flex items-center font-bold"
                href={prevLink}
            >
                <Heading as="h3" fontSize={windowWidth && windowWidth>=640 ? "18 ": "md"} >{prevTitle}</Heading>
            </Link >
            <div className="flex items-center text-slate-400">
                <ChevronRight className="h-5 w-5" />
                <Heading as="h3" fontSize={windowWidth && windowWidth >=640 ? "18 ": "md"} >{currentTitle}</Heading>
            </div>
    </div>
    );
}
 
export default Address;