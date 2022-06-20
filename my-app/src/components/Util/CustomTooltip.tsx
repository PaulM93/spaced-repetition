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
        border="1px solid white"
        label={label}
        bg="blackAlpha"
        borderRadius="5px"
      >
        {children}
      </Tooltip>
    </>
  );
}
