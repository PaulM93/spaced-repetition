import React from "react";
import { Flex, ModalFooter, Button, Box, HStack } from "@chakra-ui/react";
import MotionButton from "../../Util/MotionButton";

interface FooterProps {
  setViewAllCards: (val: boolean) => void;
  viewAllCards: boolean;
  saveCollection: () => void;
  handleAddCard: () => void;
  cardAdded: boolean;
}

export default function Footer({
  setViewAllCards,
  viewAllCards,
  saveCollection,
  handleAddCard,
  cardAdded,
}: FooterProps) {
  return (
    <ModalFooter>
      <Flex w="100%" justify="space-between">
        <Box onClick={() => setViewAllCards(!viewAllCards)}>
          <MotionButton text={!viewAllCards ? "View all Cards" : "Go back"} />
        </Box>
        {!viewAllCards && (
          <HStack spacing={2}>
            <Button onClick={() => handleAddCard()} colorScheme="blue">
              Add Card
            </Button>
            <Button
              isDisabled={!cardAdded}
              onClick={() => saveCollection()}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
          </HStack>
        )}
      </Flex>
    </ModalFooter>
  );
}
