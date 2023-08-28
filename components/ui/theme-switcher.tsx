import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";


const ThemeSwitcher = () => {
    const { toggleColorMode } = useColorMode()

    return ( 
        <AnimatePresence mode="wait" initial={false}>
            <motion.div 
                style={{ display: 'inline-block' }}
                key={useColorModeValue('light', 'dark')}
                initial={{y: -20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: 20, opacity: 0}}
                transition={{ duration: 0.2 }}
            >
                <IconButton 
                    aria-label="Toggle theme"
                    icon={useColorModeValue(<SunIcon className="h-[1.2rem] w-[1.2rem]"/>,<MoonIcon className="h-[1.2rem] w-[1.2rem]" /> )}
                    onClick={toggleColorMode}
                />
            </motion.div>
        </AnimatePresence>
    );
}
 
export default ThemeSwitcher;