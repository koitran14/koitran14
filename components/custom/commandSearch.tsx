"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useCommandHook from "@/hooks/useCommandHook";
import React, { useState } from "react";
import { works } from "@/data/works";
import Link from "next/link";

export function CommandMenu() {
  const { isOpen, onOpen, setOpen } = useCommandHook();
  const [searchTerm, setSearchTerm] = useState<string>("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLocaleLowerCase() === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpen]);

  // Filter works based on the search term
  const filteredWorks = works.filter((work) => {
    const searchRegex = new RegExp(searchTerm, "i"); // Case-insensitive regex
    return (
      searchTerm === "" || // Return all if searchTerm is empty
      searchRegex.test(work.title) ||
      searchRegex.test(work.author) ||
      searchRegex.test(work.description)
    );
  });

  // Function to highlight matching text
  const highlightText = (text: string, search: string): JSX.Element[] => {
    if (!search) return [<span key={text}>{text}</span>]; // Original text if no search term
    const regex = new RegExp(`(${search})`, "gi"); // Case-insensitive regex for highlighting
    const parts = text.split(regex); // Split text based on search term

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span> // Highlight matched part
      ) : (
        <span key={index}>{part}</span> // Normal text
      )
    );
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={(value) => setSearchTerm(value)} // Update search term
      />
      <CommandList>
        {filteredWorks.length === 0 ? (
          <p className="p-6 place-self-center text-sm text-slate-500">No results found.</p>
        ) : (
          <CommandGroup heading="Works">
            {filteredWorks.map((work) => (
              <Link key={work.id} href={`/works/${work.id}`} onClick={() => setOpen(false)}>
                <CommandItem className="odd:bg-blue-50 hover:bg-blue-100">
                  <img
                    src={work.headingImg} // Thumbnail image
                    alt={work.title}
                    style={{
                      width: "80px",
                      height: "40px",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {highlightText(work.title, searchTerm)}
                    </span>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {highlightText(work.description, searchTerm)} {/* Highlighted description */}
                    </p>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
