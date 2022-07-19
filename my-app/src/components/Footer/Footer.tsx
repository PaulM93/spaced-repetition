import React from "react";
import {
  Box,
  Flex,
  Divider,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  //ColorMode
  const bg = useColorModeValue(
    "background.subtleLight",
    "background.subtleDark"
  );
  const borderColor = useColorModeValue("#eaeaea", "border.darkSubtle");
  return (
    <>
      <Divider borderColor={borderColor} />
      <Box bg={bg} pt={20} pb={20} w={"100%"}>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          position={"relative"}
          bottom={"0px"}
          left="0px"
          pt={5}
          right="0px"
        >
          <VStack spacing={5}>
            <Text
              fontSize={"md"}
              color="secondary"
              fontWeight="500"
              textAlign={"center"}
            >
              Living, learning & leveling up <br /> one day at a time 🧠
            </Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
