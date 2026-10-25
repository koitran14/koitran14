"use client"

import { Container, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import MainNav, { routes } from "./main-nav";
import ThemeSwitcher from "./ui/theme-switcher";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
    return (
        <div className="fixed z-30 w-full bg-[#FAFAFA] dark:bg-[#0A0A0B] border-b border-zinc-200/60 dark:border-zinc-800/60">
            <Container className="flex py-3 items-center justify-between" maxW="container.sm" px={8}>
                <MainNav/>
                <div className="flex gap-x-2 items-center">
                    <ThemeSwitcher />
                    <div className="flex md:hidden">
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                variant="ghost"
                                size="sm"
                                aria-label="Open menu"
                                icon={<MenuIcon className="h-4 w-4" />}
                            />
                            <MenuList>
                                <MenuItem as={Link} href="/">Home</MenuItem>
                                {routes.map((r) => (
                                    <MenuItem key={r.href} as={Link} href={r.href}>{r.label}</MenuItem>
                                ))}
                                <MenuItem as="a" href="https://github.com/koitran14" target="_blank">Source ↗</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default NavBar;
