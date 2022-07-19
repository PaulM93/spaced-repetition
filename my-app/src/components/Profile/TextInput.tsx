import React from "react";
import { Input, Box, Text, useColorModeValue } from "@chakra-ui/react";

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
  //Color Mode
  const inputColor = useColorModeValue(
    "input.border.light",
    "input.border.dark"
  );
  const inputTextColor = useColorModeValue("font.light", "font.dark");
  return (
    <Box mt={4}>
      <Text fontWeight="500" fontSize={"xs"} mb="8px">
        {title}
      </Text>
      <Input
        value={value}
        onChange={(e) => handleChange(e, type)}
        minWidth={"250px"}
        id={id}
        placeholder={placeholder}
        size="md"
        fontSize={"sm"}
        borderColor={inputColor}
        color={inputTextColor}
        focusBorderColor="purple.500"
        errorBorderColor="red.300"
      />
    </Box>
  );
}
