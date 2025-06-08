"use client"
import { Box, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import type { TextProps } from "@chakra-ui/react"
import type { ForwardRefComponent } from "framer-motion"

const MotionBox = motion(Box)
const MotionText = motion(Text) as ForwardRefComponent<typeof Text, TextProps>

// Minimal BioSection using Chakra theme
export const BioSection = ({ children, ...props }: any) => (
  <MotionBox
    display="grid"
    gridTemplateColumns={{ base: "1fr", md: "140px 1fr" }}
    gap={{ base: 2, md: 6 }}
    mb={4}
    py={2}
    {...props}
  >
    {children}
  </MotionBox>
)

// Simple BioYear with Chakra colors
export const BioYear = ({ children, ...props }: any) => (
  <MotionText fontWeight="semibold" _dark={{ color: "pink.500" }} color="orange.500" fontSize="md" {...props}>
    {children}
  </MotionText>
)

// Clean BioDesc with Chakra theme
export const BioDesc = ({ children, ...props }: any) => (
  <MotionText color="gray.600" _dark={{ color: "gray.400" }} lineHeight="tall" fontSize="md" fontWeight={500} {...props}>
    {children}
  </MotionText>
)

// Keep experience components but simplify with Chakra
export const ExperienceItem = ({ children, ...props }: any) => (
  <MotionBox
    p={6}
    bg="white"
    _dark={{ bg: "gray.800", borderColor: "gray.700" }}
    borderRadius="md"
    border="1px"
    borderColor="gray.100"
    mb={4}
    _hover={{
      borderColor: "gray.200",
      _dark: { borderColor: "gray.600" },
      shadow: "sm",
    }}
    transition="all 0.2s"
    {...props}
  >
    {children}
  </MotionBox>
)

export const CompanyBadge = ({ children, ...props }: any) => (
  <MotionBox
    as="span"
    display="inline-flex"
    alignItems="center"
    px={3}
    py={1}
    borderRadius="full"
    fontSize="sm"
    fontWeight="medium"
    gap={2}
    transition="all 0.2s"
    _hover={{ transform: "scale(1.02)" }}
    {...props}
  >
    {children}
  </MotionBox>
)

export const JobTitle = ({ children, ...props }: any) => (
  <MotionText as="h4" fontSize="lg" fontWeight="semibold" mb={2} display="flex" alignItems="center" gap={2} {...props}>
    {children}
  </MotionText>
)

export const SkillTag = ({ children, ...props }: any) => (
  <MotionBox
    as="span"
    display="inline-block"
    px={2}
    py={1}
    borderRadius="md"
    fontSize="xs"
    fontWeight="medium"
    mr={2}
    mb={2}
    bg="gray.100"
    color="gray.700"
    _dark={{ bg: "gray.700", color: "gray.300" }}
    {...props}
  >
    {children}
  </MotionBox>
)
