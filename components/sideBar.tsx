"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeColor = useColorModeValue('#f97316', '#ec4899');
  const unactiveColor = useColorModeValue('#4B5563', '#00000080');

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Array of platform data including icons and URLs
  const platforms = [
    { name: "facebook", Icon: Facebook, url: "https://facebook.com/your-profile", bgColor: "bg-blue-600" },
    { name: "linkedin", Icon: Linkedin, url: "https://linkedin.com/your-profile", bgColor: "bg-blue-700" },
    { name: "instagram", Icon: Instagram, url: "https://instagram.com/your-profile", bgColor: "bg-pink-500" },
    { name: "contact", Icon: Mail, url: undefined, bgColor: "bg-gray-600" },
  ];

  return (
    <div className="fixed bottom-2 right-[28%] p-2 z-50 flex flex-col items-center transition-all duration-300 ease-in-out space-y-4">
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
                onClick={() => name === "contact" && alert("Contact Us Clicked!")}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white ${bgColor}`}
              >
                <Icon size={20} strokeWidth={1}/>
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
        {isExpanded ? "✕" : "☰"}
      </motion.button>
    </div>
  );
};
