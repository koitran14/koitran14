"use client";

import * as React from "react";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "@/components/theme";
import Fonts from "@/components/ui/fonts";
import Footer from "@/components/footer";
import { SideBar } from "@/components/sideBar";
import ModalProvider from "@/components/modalProvider";
import { Toolbar } from "@/components/toolbar";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      toast({
        title: "Welcome 😊",
        description: "Welcome to the app! Enjoy your stay.",
      });

      localStorage.setItem("isFirstVisit", "true");
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <ChakraProvider theme={theme}>
            <Fonts />
            <NavBar />
            <ModalProvider />
            <Toaster />
            <Container maxW="container.sm" pt={20} px={10} className="relative">
              <Toolbar />
              {children}
            </Container>
            <Footer />
          </ChakraProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
