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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <Fonts />
          <NavBar />
          <ModalProvider/>
          <Container maxW="container.sm" pt={20} px={10} className="relative">
            <SideBar />
            {children}
          </Container>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
