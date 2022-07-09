import React from "react";
import { useTheme } from "../ThemeContext";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface HelperTextProps {
  helperText: string;
  buttonText: string;
  url: string;
}

export default function HelperText({
  helperText,
  buttonText,
  url,
}: HelperTextProps) {
  const { theme } = useTheme();
  const text = useColorModeValue("font.lightSubtle", "font.darkSubtle");
  return (
    <Text fontSize={"sm"} color={text}>
      {helperText}
      <Link to={url}>
        <span style={theme.buttons.authButton.helperText}>{buttonText}</span>
      </Link>
    </Text>
  );
}
