import React from "react";
import { motion } from "framer-motion";
import {
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

interface AuthLayoutProps {
  children: any;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  const brainIcon = (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{
        scale: 1.1,
        rotate: [0, 10, 0],
        transition: {
          duration: 1.2,
          yoyo: Infinity,
        },
      }}
      style={{ marginLeft: "7px" }}
    >
      🧠
    </motion.div>
  );

  //Color Mode Value
  const heading = useColorModeValue("font.light", "font.dark");
  const subHeading = useColorModeValue("font.lightSubtle", "font.darkSubtle");

  return (
    <Flex flexDir={"column"} align="center" minW="100%" mt={"100px"}>
      <Flex flexDir={"column"} w={["95%", "80%", "60%", "45%"]}>
        <VStack align={"flex-start"}>
          <Heading
            color={heading}
            size={"xl"}
            display="flex"
            alignContent="center"
          >
            {title} {brainIcon}
          </Heading>
          <Text color={subHeading} align="center">
            {subtitle}
          </Text>
        </VStack>
        {children}
      </Flex>
    </Flex>
  );
}
