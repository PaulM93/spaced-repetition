import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import ProfileWrapper from "./ProfileWrapper";

interface GeneralProps {
  handleChange: any;
  userDetails: any;
  handleSubmit: any;
  title: string;
  subtitle: string;
  userLoading: {
    val: boolean;
    type: "string";
  };
}

export default function General({
  userDetails,
  handleChange,
  handleSubmit,
  title,
  subtitle,
  userLoading,
}: GeneralProps) {
  const inputColor = useColorModeValue(
    "input.border.light",
    "input.border.dark"
  );
  const inputTextColor = useColorModeValue("font.light", "font.dark");
  return (
    <>
      <ProfileWrapper
        loading={userLoading}
        loadingType={"profile"}
        handleSubmit={handleSubmit}
        title={title}
        type={"userDetails"}
        subtitle={subtitle}
      >
        <Box mb={2}>
          <Text fontSize={"xs"} mb="8px" fontWeight={"500"}>
            UserName:
          </Text>
          <Input
            value={userDetails.username}
            onChange={handleChange}
            minWidth={"250px"}
            id="username"
            placeholder="Enter your username..."
            size="md"
            borderColor={inputColor}
            color={inputTextColor}
            fontSize={"sm"}
            focusBorderColor="purple.500"
            errorBorderColor="red.300"
          />
        </Box>
        <Flex w="100%" justify="space-between" align={"flex-end"}>
          <Box>
            <Text fontSize={"xs"} mb="8px" fontWeight={"500"}>
              Bio
            </Text>
            <Textarea
              minWidth={"250px"}
              value={userDetails.bio}
              variant="outline"
              fontSize={"sm"}
              borderColor={inputColor}
              color={inputTextColor}
              focusBorderColor="purple.500"
              placeholder="Tell us a bit about you..."
              id="body"
              errorBorderColor="red.300"
              onChange={handleChange}
            />
          </Box>
        </Flex>
      </ProfileWrapper>
    </>
  );
}
