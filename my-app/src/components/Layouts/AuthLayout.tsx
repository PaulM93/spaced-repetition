import React from "react";
import { motion } from "framer-motion";
import { Flex, Heading, Text, VStack } from "@chakra-ui/react";

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

  return (
    <Flex flexDir={"column"} align="center" minW="100%" mt={"100px"}>
      <Flex flexDir={"column"} w={["95%", "80%", "45%", "45%"]}>
        <VStack align={"flex-start"}>
          <Heading
            color="white"
            size={"xl"}
            display="flex"
            alignContent="center"
          >
            {title} {brainIcon}
          </Heading>
          <Text color="#ffffffb3" align="center">
            {subtitle}
          </Text>
        </VStack>
        {children}
      </Flex>
    </Flex>
  );
}
