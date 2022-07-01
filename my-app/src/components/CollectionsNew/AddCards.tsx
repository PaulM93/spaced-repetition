import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
//Components
import EditCards from "./EditCards/EditCards";
import {
  Modal,
  Flex,
  useDisclosure,
  Icon,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Heading,
  Text,
  FormErrorMessage,
  ModalCloseButton,
  HStack,
  Editable,
  EditableInput,
  EditableTextarea,
  ButtonGroup,
  useEditableControls,
  EditablePreview,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import CustomTooltip from "../Util/CustomTooltip";

export default function AddCards({ handleAddCards, saveCollection, cards }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const initialRef = React.useRef(null);
  //If the card already exists we show this
  //Show number of cards added

  const generateID = () => {
    return uuidv4();
  };

  //Allow user to view all cards
  interface CardDetails {
    front: string;
    back: string;
    interval: number;
    repetition: number;
    efactor: number;
  }
  //Card Details
  const [cardDetails, setCardDetails] = useState({
    front: "",
    back: "",
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    dueDate: dayjs(Date.now()).toISOString(),
    id: generateID(),
  });

  console.log("Is open", isOpen);

  //Put front and back of cards in array when open
  const openVal = isOpen === true;
  const [allCards, setAllCards] = useState<{}[]>([]);
  const [cardVals, setCardVals] = useState([]);
  useEffect(() => {
    const allCardsArr: {}[] = [];
    const frontCards: string[] = [];
    const backCards: string[] = [];
    if (isOpen) {
      //Set card vals
      JSON.parse(cards).map((card: { front: string; back: string }) => {
        allCardsArr.push(card);
        frontCards.push(card.front);
        backCards.push(card.back);
      });
      setAllCards(allCardsArr);
      setCardVals([...frontCards, ...backCards]);
    }
    //ensure when card added we run through again
  }, [openVal, cards, isOpen]);

  console.log("AllCards", allCards);

  //Card exists
  const [cardExists, setCardExists] = useState({
    val: null,
    id: "",
  });
  const handleChange = (e: any) => {
    //Check if card already exists in collection -- indexof
    //Display this
    cardVals.indexOf(e.target.value) === -1
      ? setCardExists({ val: false, id: e.target.id })
      : setCardExists({ val: true, id: e.target.id });
    //Set card details
    setCardDetails({
      ...cardDetails,
      [e.target.id]: e.target.value,
    });
  };

  /*
    View all cards 
    //////////////
    List of all cards with option to delete, e
  */
  const [viewAllCards, setViewAllCards] = useState(false);

  const resetObject = {
    ...cardDetails,
    front: "",
    back: "",
    id: generateID(),
  };

  const [cardAdded, setCardAdded] = useState(false);
  const handleAddCard = () => {
    //When card is added create an identical copy but with front and back reversed
    setCardAdded(true);
    //dont allow user to save if they havent added any new cards
    setCardDetails(resetObject);
    handleAddCards(cardDetails);
    // setCards([...cards, cardDetails]);
  };

  const handleClose = () => {
    setCardDetails(resetObject);
    onClose();
  };

  return (
    <>
      <CustomTooltip label={"Add Cards"}>
        <IconButton
          onClick={onOpen}
          colorScheme={"blackAlpha"}
          size="sm"
          aria-label={"Add Cards"}
          icon={<Icon color="#666666" as={FiPlus} />}
        />
      </CustomTooltip>
      <Modal
        size={viewAllCards ? "md" : "xl"}
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => handleClose()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Cards</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {viewAllCards ? (
              <>
                <FormControl
                  isInvalid={cardExists.val && cardExists.id === "front"}
                >
                  <FormLabel>Front of Card</FormLabel>
                  <Input
                    focusBorderColor={
                      cardExists.val && cardExists.id === "front"
                        ? "red.300"
                        : ""
                    }
                    value={cardDetails.front}
                    onChange={handleChange}
                    id="front"
                    placeholder="Front of card..."
                    size="md"
                  />
                  {cardExists.val && cardExists.id === "front" && (
                    <FormErrorMessage>Card already exists</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  mt={4}
                  isInvalid={cardExists.val && cardExists.id === "back"}
                >
                  <FormLabel>Back of Card</FormLabel>
                  <Input
                    focusBorderColor={
                      cardExists.val && cardExists.id === "back"
                        ? "red.300"
                        : ""
                    }
                    value={cardDetails.back}
                    onChange={handleChange}
                    id="back"
                    placeholder="Back of card..."
                    size="md"
                  />
                  {cardExists.val && cardExists.id === "back" && (
                    <FormErrorMessage>Card already exists</FormErrorMessage>
                  )}
                </FormControl>
              </>
            ) : (
              <>
                <EditCards allCards={allCards} setAllCards={setAllCards} />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justify="space-between">
              <Button
                onClick={() => setViewAllCards(!viewAllCards)}
                variant="outline"
              >
                {viewAllCards ? "View all Cards" : "Return"}
              </Button>
              <Box>
                <Button
                  onClick={() => handleAddCard()}
                  colorScheme="blue"
                  mr={3}
                >
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
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
