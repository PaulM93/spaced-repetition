import React from "react";
import { Tooltip } from "@chakra-ui/react";

export default function CustomTooltip({ children }) {
  return (
    <>
      <Tooltip
        border="1px solid white"
        label="Change card order"
        bg="blackAlpha"
        borderRadius="5px"
      >
        {children}
      </Tooltip>
    </>
  );
}
