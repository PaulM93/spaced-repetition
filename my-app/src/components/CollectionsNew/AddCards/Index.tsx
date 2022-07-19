import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
//Components
import AddCards from "./AddCards";
import EditCards from "../EditCards/EditCards";
import Footer from "./Footer";
import {
  Modal,
  useDisclosure,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import MotionIconButton from "../../Util/MotionIconButton";

interface CardDetails {
  front: string;
  back: string;
  interval: number;
  repetition: number;
  efactor: number;
  dueDate: string;
  id: string;
}

interface IndexProps {
  collection: {};
  handleAddCards: (val: {}) => void;
  saveUpdatedCards: (val: {}) => void;
  saveCollection: () => void;
  cards: string;
}

export default function Index({
  collection,
  handleAddCards,
  saveUpdatedCards,
  saveCollection,
  cards,
}: IndexProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const initialRef = useRef(null);

  console.log("Collection Cards", JSON.parse(cards));

  //View
  const [viewAllCards, setViewAllCards] = useState(false);

  //Generate a cardID
  const generateID = () => {
    return uuidv4();
  };

  //Card Details
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    front: "",
    back: "",
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    dueDate: dayjs(Date.now()).toISOString(),
    id: generateID(),
  });

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
  }, [openVal, cards, isOpen]);

  //Card exists
  const [cardExists, setCardExists] = useState<{ val: boolean; id: string }>({
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

  useEffect(() => {
    if (allCards.length === 0) {
      setCardAdded(false);
      setViewAllCards(false);
    }
  }, [allCards.length]);

  const resetObject = {
    ...cardDetails,
    front: "",
    back: "",
    id: generateID(),
  };

  const [cardAdded, setCardAdded] = useState<boolean>(false);
  const handleAddCard = () => {
    //When card is added create an identical copy but with front and back reversed
    setCardAdded(true);
    //dont allow user to save if they havent added any new cards
    // console.log("Card Details", cardDetails);

    setCardDetails(resetObject);
    handleAddCards(cardDetails);
    // setCards([...cards, cardDetails]);
  };

  const handleClose = () => {
    setViewAllCards(false);
    setCardAdded(false);
    setCardDetails(resetObject);
    onClose();
  };

  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");

  const background = useColorModeValue(
    "background.subtleLight",
    "background.subtleDark"
  );
  const borderColor = useColorModeValue(
    "border.lightSubtle",
    "border.darkSubtle"
  );

  return (
    <>
      <Box onClick={onOpen}>
        <MotionIconButton label={"Add Cards"} iconType={"add"} />
      </Box>
      <Modal
        size={"xl"}
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => handleClose()}
      >
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          bg={background}
          p={4}
          border="1px"
          borderColor={borderColor}
        >
          <ModalHeader color={color}>
            {!viewAllCards ? "Add Cards" : "View all Cards"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {viewAllCards ? (
              <Text fontSize="xs" mb={2}>
                Click text to edit card.
              </Text>
            ) : null}

            {!viewAllCards ? (
              <AddCards
                cardDetails={cardDetails}
                cardExists={cardExists}
                handleChange={handleChange}
              />
            ) : (
              <>
                <EditCards
                  collection={collection}
                  saveUpdatedCards={saveUpdatedCards}
                  generateID={generateID}
                  allCards={allCards}
                  setAllCards={setAllCards}
                />
              </>
            )}
          </ModalBody>
          <Footer
            cardsExist={allCards.length}
            cardAdded={cardAdded}
            handleAddCard={handleAddCard}
            setViewAllCards={setViewAllCards}
            viewAllCards={viewAllCards}
            saveCollection={saveCollection}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
