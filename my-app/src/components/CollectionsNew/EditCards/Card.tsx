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
  useColorModeValue,
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

  //Color Mode
  const background = useColorModeValue("background.light", "background.dark");
  const color = useColorModeValue("font.light", "font.dark");
  const borderColor = useColorModeValue(
    "border.lightSubtle",
    "border.darkSubtle"
  );

  return (
    <>
      <Flex
        key={card.id}
        p={4}
        borderRadius={"7px"}
        bg={background}
        mb={2}
        justify="space-between"
      >
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
          {/* Back  */}
          <Editable
            cursor={"pointer"}
            size="sm"
            id={"back"}
            onChange={(e) => handleEditCard(e, card, "back")}
            defaultValue={card.back}
            mr={4}
            minWidth="fit-content"
            maxWidth="fit-content"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </HStack>
        <HStack>
          {/* //If changed show save button  */}
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
          {/* Reset  */}
          <Popover isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button onClick={onToggle} size="xs">
                Reset
              </Button>
            </PopoverTrigger>
            <PopoverContent
              boxShadow={
                "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
              }
              color="white"
              bg={background}
              borderColor={borderColor}
            >
              <PopoverArrow bg={background} border="none" />
              <PopoverCloseButton color={color} />
              <PopoverBody color={color} p={"25px 10px 10px 10px"}>
                <Text>
                  Are you sure you want to reset this card. You cannot undo
                  this.
                </Text>
                <Flex justify={"flex-end"}>
                  <Button
                    isLoading={isLoading}
                    size="sm"
                    onClick={() => resetCard(card.id)}
                    colorScheme={"red"}
                  >
                    Reset
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Flex>
    </>
  );
}
