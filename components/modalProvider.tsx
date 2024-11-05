"use client";
import { useEffect, useState } from "react";
import ContactModal from "./contactModal";
import { CommandMenu } from "./custom/commandSearch";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
        <ContactModal />
        <CommandMenu/>
    </>
  );
};

export default ModalProvider;
