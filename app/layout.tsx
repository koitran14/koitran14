"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "@/components/theme";
import Fonts from "@/components/ui/fonts";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/next';
import ModalProvider from "@/components/modalProvider";
import { Toolbar } from "@/components/toolbar";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatToggler } from "@/components/ui/chat-toggler";
import { FEATURES } from "@/lib/features";
import { Backdrop } from "@/components/backdrop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // every handbook route (/blog/<name>-handbook) lays out its own column and side rails
  const wide = /^\/blog\/[^/]+-handbook(\/|$)/.test(pathname);
  // the floating contact toolbar would sit over the article and the audio player while reading
  const reading = pathname.startsWith("/blog");

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
            <Backdrop />
            <NavBar />
            <ModalProvider />
            <Toaster />
            {/* the handbook lays out its own column and side rails, so it gets the full width */}
            <Container maxW={wide ? "none" : "container.sm"} pt={20} px={wide ? 0 : 8} className="scrollbar-custom relative">
              {!reading && <Toolbar />}
              {children}
              <Analytics />
            </Container>
            {FEATURES.chat && <ChatToggler />}
            <Footer />
          </ChakraProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
