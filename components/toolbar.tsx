"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  ListPlus,
  Github,
  Contact,
} from "lucide-react";
import useContactHook from "@/hooks/useContactHook";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Toolbar = () => {
  const bgColor = useColorModeValue("white", "black");
  const [isExpanded, setIsExpanded] = useState(false);
  const { onOpen } = useContactHook();

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768; // Adjust threshold for mobile

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(true);
    }
  }, [isMobile]);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      const timeoutId = setTimeout(() => {
        setIsExpanded(false);
      }, 3000); // Reset after 3 seconds

      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-2 left-0 p-2 z-50 w-full flex justify-center items-center transition-all duration-300 ease-in-out scale-100",
        !isExpanded && "scale-75"
      )}
    >
      {/* Expanded Sidebar Actions with Animation */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: bgColor }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="mt-3 flex h-12 w-fit items-center flex-row gap-x-1 p-2 rounded-full backdrop-blur border dark:bg-zinc-500/20 shadow-lg transition-all duration-300 ease-in-out"
        >
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full p-1"
            onClick={onOpen}
          >
            <Mail className="w-5 h-5" />
          </Button>
          <Separator orientation="vertical" />
          <div
            className={cn(
              "flex flex-row gap-x-1 scale-100 transition-all duration-500 ease-in-out w-fit",
              !isExpanded && "scale-0 w-0"
            )}
          >
            <Link target="_blank" href="https://www.linkedin.com/in/koitran1403/">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full p-1 hover:bg-blue-500"
              >
                <Linkedin fill="white" strokeWidth={0} className="w-5 h-5" />
              </Button>
            </Link>
            {/* <Link target="_blank" href="https://www.facebook.com/dangkhoimt/">
              <Button size="icon" variant="ghost" className="rounded-full p-1">
                <Facebook fill="blue" strokeWidth={0} className="w-5 h-5" />
              </Button>
            </Link> */}
            <Link target="_blank" href="https://github.com/koitran14">
              <Button size="icon" variant="ghost" className="rounded-full p-1">
                <Github fill="gray" strokeWidth={0} className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div
            className={cn(
              "flex flex-row -ml-1 gap-x-1 scale-100 transition-all duration-500 ease-in-out w-fit",
              isExpanded && "scale-0 w-0"
            )}
          >
            <Button size="icon" variant="ghost" className="rounded-full p-1">
              <Contact strokeWidth={2} className="w-5 h-5" />
            </Button>
          </div>
          <Separator orientation="vertical" />
          <Button size="icon" variant="ghost" className="rounded-full p-1">
            <ListPlus className="w-5 h-5" />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};