import React from "react";
import { Flex, Button, Box, useColorModeValue } from "@chakra-ui/react";
import Title from "./Title";

interface ProfileWrapperProps {
  children: any;
  title: string;
  subtitle: string;
  handleSubmit: any;
  type: string;
  loadingType: "email" | "password" | "profile";
  loading: {
    val: boolean;
    type: string;
  };
}

export default function ProfileWrapper({
  children,
  title,
  subtitle,
  handleSubmit,
  type,
  loadingType,
  loading,
}: ProfileWrapperProps) {
  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");
  const borderColor = useColorModeValue("#eaeaea", "border.darkSubtle");

  return (
    <Flex
      width="100%"
      border="1px"
      borderColor={borderColor}
      borderRadius={"5px"}
      color={color}
      p={10}
      mb={4}
      justify={"center"}
    >
      <Flex
        flexDir={"column"}
        align="flex-start"
        width={"100%"}
        justify="flex-start"
      >
        {title !== "" ? <Title title={title} subititle={subtitle} /> : null}
        <Flex align="flex-end" justify={"space-between"} w="100%">
          <Box>{children}</Box>
          <Button
            isLoading={loading.val && loading.type === loadingType}
            onClick={() => handleSubmit(type)}
            variant="outline"
            size={"sm"}
            colorScheme={"gray"}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
