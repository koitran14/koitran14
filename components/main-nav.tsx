"use client"

import Link from "next/link";
import Logo from "./ui/logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FEATURES } from "@/lib/features";

export const routes = [
    { href: '/works', label: 'Works' },
    ...(FEATURES.blog ? [{ href: '/blog', label: 'Notes' }] : []),
    { href: '/gallery', label: 'Gallery' },
]

const MainNav = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-x-6">
            <Logo />
            <nav className="hidden md:flex items-center gap-x-5 text-sm">
                {routes.map((route) => {
                    const active = pathname.startsWith(route.href);
                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                                "py-1 transition-colors duration-200 border-b",
                                active
                                    ? "border-current text-zinc-900 dark:text-zinc-100"
                                    : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            )}
                        >
                            {route.label}
                        </Link>
                    );
                })}
                <a
                    href="https://github.com/koitran14"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
                >
                    Source ↗
                </a>
            </nav>
        </div>
    );
}

export default MainNav;
