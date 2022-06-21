import React from "react";
import { motion, Reorder } from "framer-motion";
import {
  Button,
  Box,
  Flex,
  Divider,
  Text,
  Heading,
  HStack,
  Grid,
  Icon,
  Tooltip,
  GridItem,
  IconButton,
  Avatar,
  VStack,
  calc,
  transition,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Flex
      minHeight={'calc("100vh - 80px")'}
      flexDir="column"
      mt={5}
      minWidth={"100%"}
      // bg="green"
      alignItems={"center"}
    >
      <VStack spacing={0} height="100%" mb={"60px"}>
        <Heading fontWeight={900} lineHeight={1} color="white" fontSize="140px">
          Simple.
        </Heading>
        <Box position={"relative"}>
          <Heading
            position={"relative"}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontWeight={900}
            lineHeight={1}
            fontSize="140px"
          >
            Spaced.
          </Heading>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 10,
                yoyo: Infinity,
              },
            }}
          >
            <Heading
              position={"absolute"}
              left={0}
              top={0}
              bgGradient="linear(to-l, #FF0080,  #7928CA)"
              bgClip="text"
              fontWeight={900}
              lineHeight={1}
              fontSize="140px"
            >
              Spaced.
            </Heading>
          </motion.h1>
        </Box>
        <Heading fontWeight={900} lineHeight={1} color="white" fontSize="140px">
          Repetition.
        </Heading>
      </VStack>
      <Box position={"relative"}>
        <Link to="/signup">
          <motion.button
            style={{
              position: "relative",
              borderRadius: "5px",
              background: "white",
              fontWeight: "500",
              marginRight: "10px",
              color: "black",
              padding: "10px 20px 10px 20px",
              border: "1px solid white",
            }}
          >
            Train your brain
          </motion.button>
        </Link>
        <motion.button
          style={{
            position: "relative",
            borderRadius: "5px",
            color: "#ffffffb3",
            padding: "10px 20px 10px 20px",
            border: "1px solid #262626",
          }}
        >
          Find out more
        </motion.button>
      </Box>
    </Flex>
  );
}
