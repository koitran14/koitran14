"use client"

import { Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Logo from "./ui/logo";
import { IoLogoGithub } from "react-icons/io5";
import { motion } from "framer-motion";


import { usePathname, useRouter } from "next/navigation";

const MainNav = ({
    className,
} : React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();

    const routes = [
       
        {
            href:'/works',
            label: 'Works',
            active: pathname === '/works'
        },
        {
            href:'/gallery',
            label: 'Gallery',
            active: pathname === '/gallery'
        }
    ]
    
    const router = useRouter();
    const activeBg = useColorModeValue( 'bg-black', 'bg-white')
    const colorFont = useColorModeValue('text-slate-500', 'text-slate-200');
    const activeColor = useColorModeValue( 'text-white', 'text-black');

    return (
        <div className="flex items-center gap-x-2 px-2">
           <Flex align="center">
                <Heading as="h1" size="lg" letterSpacing={'tighter'} className="antialiased" >
                    <Logo />
                </Heading>
            </Flex>

            <div className="hidden md:flex gap-x-4 text-slate-500 items-center "> 
                <div className="text-xl items-center">|</div>
                <div className="flex space-x-2 items-center">
                    {routes.map((route) => (
                        <button
                        key={route.href}
                        onClick={() => router.push(`${route.href}`)}
                        className={`${
                            route.active  ? activeColor : colorFont
                        } relative px-3 py-1.5 text-md font-medium outline-sky-400 transition focus-visible:outline-2`}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                        >
                        {route.active && (
                            <motion.span
                            layoutId="bubble"
                            className={`${ activeBg } absolute inset-0 -z-10 mix-blend-difference`}
                            style={{ 
                                borderRadius: 0,
                            }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}
                            {route.label}
                        </button>
                    ))}
                </div>
                <a href="https://github.com/koitran14" target="_blank" >
                    <Button 
                        variant="solid" 
                        leftIcon={<IoLogoGithub className="text-2xl"/>} 
                        size="md"
                        _hover={{ backgroundColor: activeBg, color: activeColor}}
                        _active={{ opacity: 0.8 }}
                    >
                        Source
                    </Button>
                </a>
            </div>
        </div>
    );
}
 
export default MainNav;