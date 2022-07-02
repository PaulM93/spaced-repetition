import React, { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
//Components
import AddCards from "./AddCards";
import EditCards from "../EditCards/EditCards";
import Footer from "./Footer";
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
  FormErrorMessage,
  ModalCloseButton,
} from "@chakra-ui/react";
import CustomTooltip from "../../Util/CustomTooltip";

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

  console.log("All Cards", allCards);

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
    setCardDetails(resetObject);
    handleAddCards(cardDetails);
    // setCards([...cards, cardDetails]);
  };

  const handleClose = () => {
    setViewAllCards(false);
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
        <ModalContent
          color="white"
          bg="#141414"
          border={"1px solid #262626"}
          p={4}
        >
          <ModalHeader>Add Cards</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
