import React from "react";
import { Tooltip } from "@chakra-ui/react";

interface CustomTooltipProps {
  label: string;
  children: any;
}

export default function CustomTooltip({ children, label }: CustomTooltipProps) {
  return (
    <>
      <Tooltip
        hasArrow
        position={"absolute"}
        color="#fafafa"
        label={label}
        bg="#805AD5"
        borderRadius="5px"
      >
        {children}
      </Tooltip>
    </>
  );
}
