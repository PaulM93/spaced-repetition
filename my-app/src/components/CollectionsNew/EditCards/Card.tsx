import React from "react";
import {
  Button,
  Text,
  HStack,
  Editable,
  Flex,
  EditableInput,
  EditablePreview,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@chakra-ui/react";

interface CardProps {
  card: { id: string; front: string; back: string };
  editInProgress: { val: boolean; id: string };
  handleEditCard: (
    newVal: string,
    cardObj: { id: string },
    val: string
  ) => void;
  handleSaveCards: () => void;
  deleteCard: (id: string) => void;
  resetCard: (id: string) => void;
}
const isLoading = false;

export default function Card({
  card,
  editInProgress,
  handleEditCard,
  deleteCard,
  resetCard,
  handleSaveCards,
}: CardProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();
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
            <Button size="xs" onClick={() => handleSaveCards()}>
              Save
            </Button>
          </>
        )}

        <Button size="xs" onClick={() => deleteCard(card.id)}>
          Delete
        </Button>
        <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button onClick={onToggle} size="xs">
              Reset
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Text color="black">
                Are you sure you want to reset this card. You cannot undo this.
              </Text>
              <Button
                isLoading={isLoading}
                onClick={() => resetCard(card.id)}
                colorScheme={"red"}
              >
                Reset
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
}
