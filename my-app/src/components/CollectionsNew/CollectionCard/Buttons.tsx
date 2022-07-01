import React from "react";
import CustomTooltip from "../../Util/CustomTooltip";
import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { FiPlus, FiEdit2, FiTrash } from "react-icons/fi";
import DeleteButton from "./DeleteButton";
import AddEditCollection from "../AddEditCollection";
import AddCards from "../AddCards";

interface ButtonsProps {
  collection: {
    title: string;
    id: number;
    description: string;
    category: string;
    cards: [];
  };
  handleAddCards: any;
  saveCollection: any;
}

export default function Buttons({
  collection: { title, id, description, category, cards },
  handleAddCards,
  saveCollection,
}: ButtonsProps) {
  const buttonArr = [
    <DeleteButton id={id} />,
    <AddCards
      cards={cards}
      saveCollection={saveCollection}
      handleAddCards={handleAddCards}
    />,
    <AddEditCollection
      type={"edit"}
      collection={{
        title: title,
        id: id,
        description: description,
        category: category,
      }}
    />,
  ];
  return (
    <HStack spacing={1}>
      {buttonArr.map((button) => button)}

      {/* {buttonArr.map((button) => (
        <CustomTooltip label={button.title}>
          <IconButton
            colorScheme={"blackAlpha"}
            size="sm"
            aria-label={button.title}
            icon={<Icon color="#666666" as={button.icon} />}
          />
        </CustomTooltip>
      ))} */}
    </HStack>
  );
}
