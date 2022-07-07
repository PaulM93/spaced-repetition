import React from "react";
import { Box, Flex, Text, Input, Textarea } from "@chakra-ui/react";
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
          <Text fontSize={"xs"} mb="8px">
            UserName:
          </Text>
          <Input
            value={userDetails.username}
            onChange={handleChange}
            minWidth={"250px"}
            id="username"
            placeholder="Enter your username..."
            size="md"
            color="#ffffff"
            fontSize={"sm"}
            borderColor={"#262626"}
            focusBorderColor="purple.400"
            errorBorderColor="red.300"
          />
        </Box>
        <Flex w="100%" justify="space-between" align={"flex-end"}>
          <Box>
            <Text fontSize={"xs"} mb="8px">
              Bio
            </Text>
            <Textarea
              minWidth={"250px"}
              value={userDetails.bio}
              variant="outline"
              fontSize={"sm"}
              borderColor={"#262626"}
              focusBorderColor="purple.400"
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
