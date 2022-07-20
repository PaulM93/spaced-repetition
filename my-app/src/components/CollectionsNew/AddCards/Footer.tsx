import React from "react";
import { Flex, ModalFooter, Button, Box, HStack } from "@chakra-ui/react";

interface FooterProps {
  setViewAllCards: (val: boolean) => void;
  viewAllCards: boolean;
  saveCollection: () => void;
  handleAddCard: () => void;
  cardAdded: boolean;
  cardsExist: number;
}

export default function Footer({
  setViewAllCards,
  viewAllCards,
  saveCollection,
  handleAddCard,
  cardsExist,
  cardAdded,
}: FooterProps) {
  return (
    <ModalFooter>
      <Flex w="100%" justify="space-between">
        {cardsExist !== 0 ? (
          <Box onClick={() => setViewAllCards(!viewAllCards)}>
            {/* dont show button if cards.length === 0  */}
            <Button variant={"outline"} size="sm" colorScheme={"purple"}>
              {!viewAllCards ? "View all Cards" : "Go back"}
            </Button>
          </Box>
        ) : (
          <div></div>
        )}
        {!viewAllCards && (
          <HStack spacing={2}>
            <Button
              size="sm"
              variant="solid"
              onClick={() => handleAddCard()}
              colorScheme="purple"
            >
              Add Card
            </Button>
            {/* <Button
              isDisabled={!cardAdded}
              background="purple.800"
              _hover={{ background: "purple.600" }}
              color="white"
              onClick={() => saveCollection()}
              variant="solid"
              size="sm"
              mr={3}
            >
              Save
            </Button> */}
          </HStack>
        )}
      </Flex>
    </ModalFooter>
  );
}
