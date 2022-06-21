import React from "react";
import { Text } from "@chakra-ui/react";
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
  return (
    <Text fontSize={"sm"} color="#ffffffb3">
      {helperText}
      <Link to={url}>
        <span style={{ color: "#ffffff", marginLeft: "5px" }}>
          {buttonText}
        </span>
      </Link>
    </Text>
  );
}
