import React from "react";
import CustomTooltip from "../../Util/CustomTooltip";
import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

//Custom tooltip with description -- category contains language
interface CategoryProps {
  category: string;
  description: string;
}

export default function Category({ category, description }: CategoryProps) {
  return category !== "" ? (
    <CustomTooltip label={description}>
      <Tag size="sm" variant="solid" colorScheme={"purple"} p={1}>
        <TagLabel>{category}</TagLabel>
        <TagRightIcon as={FiInfo} />
      </Tag>
    </CustomTooltip>
  ) : null;
}
