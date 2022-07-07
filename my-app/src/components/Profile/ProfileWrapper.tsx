import React from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
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
  return (
    <Flex
      width="100%"
      border="1px solid #262626"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
      borderRadius={"5px"}
      color="#fafafa"
      p={10}
      mb={4}
      justify={"center"}
      borderBottom="1px solid #262626"
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
            colorScheme={"purple"}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
