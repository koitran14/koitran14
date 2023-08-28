"use client"

import {  Container, IconButton,  Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import MainNav from "./main-nav";
import ThemeSwitcher from "./ui/theme-switcher";
import {  MenuIcon } from "lucide-react";
import { IoLogoGithub } from 'react-icons/io5'

const NavBar = () => {
    const bgColor = useColorModeValue('#ffffff40', '#20202380');

    return ( 
        <div className="fixed z-30 w-full backdrop-blur-[10px] py-1"
            style={{ background: bgColor }}
        >
            <Container className="flex p-2 items-center justify-between"
            maxW="container.md"
            >
                <MainNav/>
                <div className="flex gap-x-2 items-center">
                    <ThemeSwitcher />
                    <div className="flex md:hidden">
                        <Menu>
                            <MenuButton 
                                as={IconButton} 
                                variant="outline" 
                                icon={<MenuIcon />}
                                >
                            </MenuButton>
                            <MenuList>
                                <a href="/">
                                    <MenuItem className="hover:underline hover:decoration-1">Me!</MenuItem>
                                </a>
                                <a href="/works">
                                    <MenuItem className="hover:underline hover:decoration-1">Works</MenuItem>
                                </a>
                                <a href="/gallery">
                                    <MenuItem className="hover:underline hover:decoration-1">Gallery</MenuItem>
                                </a>
                                <a 
                                    href="https://github.com/koitran14"
                                    target="_blank"
                                >
                                    <MenuItem  className="gap-x-2 hover:underline hover:decoration-1">
                                        Source
                                        <IoLogoGithub className="text-2xl"/>
                                    </MenuItem>
                                </a>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </Container>
        </div>
    );
}
 
export default NavBar;