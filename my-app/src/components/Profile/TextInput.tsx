import React from "react";
import { Input, Box, Text } from "@chakra-ui/react";

interface TextInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  value: string;
  placeholder: string;
  id: string;
  title: string;
  type: "userDetails" | "passwordDetails" | "emailDetails";
}

export default function TextInput({
  id,
  value,
  handleChange,
  placeholder,
  title,
  type,
}: TextInputProps) {
  return (
    <Box mt={4}>
      <Text fontSize={"xs"} mb="8px">
        {title}
      </Text>
      <Input
        value={value}
        onChange={(e) => handleChange(e, type)}
        minWidth={"250px"}
        id={id}
        placeholder={placeholder}
        size="md"
        color="#ffffff"
        fontSize={"sm"}
        borderColor={"#262626"}
        focusBorderColor="purple.400"
        errorBorderColor="red.300"
      />
    </Box>
  );
}
