"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";
import { AlignJustify, Facebook, Instagram, Linkedin, Mail, X } from "lucide-react";
import useContactHook from "@/hooks/useContactHook";

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeColor = useColorModeValue('#f97316', '#ec4899');
  const unactiveColor = useColorModeValue('#4B5563', '#00000080');

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const platforms = [
    // { name: "facebook", Icon: Facebook, url: "https://facebook.com/your-profile", bgColor: "bg-blue-600" },
    { name: "linkedin", Icon: Linkedin, url: "https://www.linkedin.com/in/koitran1403/", bgColor: "bg-blue-700" },
    { name: "instagram", Icon: Instagram, url: "https://www.instagram.com/khoitran1403/", bgColor: "bg-pink-500" },
    { name: "contact", Icon: Mail, url: undefined, bgColor: "bg-gray-600" },
  ];

  const { onOpen } = useContactHook();

  return (
    <div className="fixed bottom-2 lg:right-[28%] right-2 p-2 z-50 flex flex-col items-center transition-all duration-300 ease-in-out space-y-4">
      {/* Expanded Sidebar Actions with Animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col gap-y-2 p-2 rounded-2xl backdrop-blur dark:bg-zinc-500/20 shadow-lg"
          >
            {platforms.map(({ name, Icon, url, bgColor }, index) => (
              <motion.a
                key={name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
                href={name === "contact" ? undefined : url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => name === "contact" && onOpen()}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white ${bgColor}`}
              >
                <Icon size={24} strokeWidth={2}/>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button to Toggle Sidebar with Animation */}
      <motion.button
        data-active={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        className={"w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white shadow-lg"}
        animate={{ 
            rotate: isExpanded ? 90 : 0,
            backgroundColor: isExpanded ? activeColor :  unactiveColor
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isExpanded ? <X className="w-5 h-5"/> : <AlignJustify className="w-5 h-5"/>}
      </motion.button>
    </div>
  );
};
