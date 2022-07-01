import React from "react";
import {
  Button,
  Text,
  HStack,
  Editable,
  Flex,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

interface CardProps {
  card: { id: string; front: string; back: string };
  editInProgress: { val: boolean; id: string };
  handleEditCard: (
    newVal: string,
    cardObj: { id: string },
    val: string
  ) => void;
}

export default function Card({
  card,
  editInProgress,
  handleEditCard,
}: CardProps) {
  return (
    <Flex key={card.id} p={4} bg="#fafafa" mb={2} justify="space-between">
      <HStack spacing={2}>
        {/* use editable - if there is a change a save button appears  */}
        <Editable
          cursor={"pointer"}
          size="sm"
          id={"front"}
          onChange={(e) => handleEditCard(e, card, "front")}
          defaultValue={card.front}
          mr={4}
          minWidth="fit-content"
          maxWidth="fit-content"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>

        {/* <Text mr={4}>Front: {card.front}</Text> */}
        <Text>Back: {card.back}</Text>
      </HStack>
      <HStack>
        {/* //If changed show save button  */}
        <Button size="xs">Edit</Button>
        {editInProgress.val && editInProgress.id === card.id && (
          <>
            <Button size="xs">
              {/* <Button size="xs" onClick={() => saveEditedCard(card.id)}> */}
              Save
            </Button>
          </>
        )}

        <Button size="xs">
          {/* <Button size="xs" onClick={() => deleteCard(card.id)}> */}
          Delete
        </Button>
        <Button size="xs">
          {/* <Button size="xs" onClick={() => resetCard(card.id)}> */}
          Reset
        </Button>
      </HStack>
    </Flex>
  );
}
