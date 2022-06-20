import React from "react";
import CustomTooltip from "../../Util/CustomTooltip";
import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { FiPlus, FiEdit2, FiTrash } from "react-icons/fi";

export default function Buttons() {
  const buttonArr = [
    {
      title: "Add Cards",
      icon: FiPlus,
    },
    {
      title: "Edit Cards",
      icon: FiEdit2,
    },
    {
      title: "Delete Collection",
      icon: FiTrash,
    },
  ];
  return (
    <HStack spacing={1}>
      {buttonArr.map((button) => (
        <CustomTooltip label={button.title}>
          <IconButton
            colorScheme={"blackAlpha"}
            size="sm"
            aria-label={button.title}
            icon={<Icon color="#666666" as={button.icon} />}
          />
        </CustomTooltip>
      ))}
    </HStack>
  );
}
