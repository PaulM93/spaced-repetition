import React from "react";
import SignupButton from "../components/Navbar/SignupButton";
import { motion } from "framer-motion";
import {
  Box,
  HStack,
  Heading,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Landing() {
  //ColorMode
  const color = useColorModeValue("font.light", "font.dark");

  return (
    <Flex
      minHeight={'calc("100vh - 80px")'}
      flexDir="column"
      mt={12}
      minWidth={"100%"}
      alignItems={"center"}
    >
      <VStack spacing={0} height="100%" mb={"60px"}>
        <Heading
          fontWeight={900}
          lineHeight={1}
          color={color}
          fontSize={["60px", "80px", "100px", "120px"]}
        >
          Simple.
        </Heading>
        <Box position={"relative"}>
          <Heading
            position={"relative"}
            bgGradient="linear(to-l, purple.400, purple.700)"
            bgClip="text"
            fontWeight={900}
            lineHeight={1}
            fontSize={["60px", "80px", "100px", "120px"]}
          >
            Spaced.
          </Heading>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 3,
                yoyo: Infinity,
              },
            }}
          >
            <Heading
              position={"absolute"}
              left={0}
              top={0}
              bgGradient="linear(to-l, purple.700,  purple.400)"
              bgClip="text"
              fontWeight={900}
              lineHeight={1}
              fontSize={["60px", "80px", "100px", "120px"]}
            >
              Spaced.
            </Heading>
          </motion.h1>
        </Box>
        <Heading
          fontWeight={900}
          lineHeight={1}
          color={color}
          fontSize={["60px", "80px", "100px", "120px"]}
        >
          Repetition.
        </Heading>
      </VStack>
      <HStack position={"relative"}>
        <SignupButton type={"landing"} />
      </HStack>
    </Flex>
  );
}
