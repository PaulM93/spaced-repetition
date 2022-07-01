import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { editCollection } from "../../../features/collections/collectionsSlice";
//Components
import Buttons from "./Buttons";
import CustomTooltip from "../../Util/CustomTooltip";
import MotionContainer from "./MotionContainer";
import TitleDisplay from "./TitleDisplay";
import LastStudied from "./LastStudied";
import StudyButton from "./StudyButton";

import {
  Box,
  Flex,
  Icon,
  GridItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiMoreVertical, FiInfo } from "react-icons/fi";

// interface CardProp {
//   setOrderDisplay: (val: boolean) => void;
//   collection: {
//     title: string,
//     description: string,
//     category: string,
//     id: number,
//   };
// }

export default function CollectionCard({
  setCardsNotDue,
  setStudyCards,
  setOrderDisplay,
  collection: {
    title,
    description,
    category,
    id,
    cards,
    nextStudyDate,
    cardsDue,
  },
  handleStudyMode,
}) {
  const toast = useToast();
  const dispatch = useDispatch();

  // console.log("Cards", JSON.parse(cards));

  /**Pass down the cardDue array to here
   * Use use effect to check if cards are due
   * Push into array due cards and display number 
   
   */

  /*
    -Make sure adding a new card doest reset the others
  
  */

  //Collection data
  //{title, descriptiom, category, cards, id}
  const [collectionData, setcollectionData] = useState({
    title: title,
    description: description,
    category: category,
    cards: JSON.parse(cards),
    id: id,
    nextStudyDate: nextStudyDate,
  });

  const setToast = (statusType, title) => {
    toast({
      title: title,
      status: statusType,
      duration: 1000,
      isClosable: true,
    });
  };

  // console.log("cards", collectionData.cards.length);

  //Add Cards
  const handleAddCards = (newCard: {}) => {
    // console.log("New card", newCard);
    setcollectionData({
      ...collectionData,
      cards: [...collectionData.cards, newCard],
    });
    //Push new card into cards arr in collectionData
    setToast("success", "Card Added");
  };

  //Move this to the dashboard
  const saveCollection = () => {
    dispatch(editCollection(collectionData));
  };

  return (
    <GridItem h="200px" width="100%">
      <MotionContainer>
        <Flex
          flexDir={"column"}
          justifyContent="space-between"
          minHeight="100%"
          p={"25px"}
        >
          <Flex flexDir={"column"}>
            <Flex justify={"space-between"} align="flex-start">
              <TitleDisplay title={title} cardsDue={cardsDue} />
              <Box>
                <CustomTooltip label={"Change Order"}>
                  <IconButton
                    onClick={() => setOrderDisplay(true)}
                    size="sm"
                    cursor={"move"}
                    colorScheme={"grey"}
                    aria-label="Change Order"
                    icon={<Icon mt={1} as={FiMoreVertical} />}
                  />
                </CustomTooltip>
              </Box>
            </Flex>
          </Flex>
          <Flex>
            <LastStudied lastStudied={"1 day ago"} />
          </Flex>
          <Flex justify={"space-between"}>
            <Buttons
              saveCollection={saveCollection}
              handleAddCards={handleAddCards}
              collection={{
                title: title,
                id: id,
                description: description,
                category: category,
                cards: cards,
              }}
            />
            {/* Study button - disable if now cards are due  */}
            <StudyButton
              nextStudyDate={nextStudyDate}
              cardsDue={cardsDue}
              collectionData={collectionData}
              handleStudyMode={handleStudyMode}
            />
            {/* <Button
              isDisabled={cardsDue.length === 0}
              onClick={() => handleStudyMode(collectionData)}
              colorScheme={"blackAlpha"}
              size="sm"
            >
              Study
            </Button> */}
          </Flex>
        </Flex>
      </MotionContainer>
    </GridItem>
  );
}
// const handleAddCards = (newCard: {}) => {
//   //Merge the added cards with the cards of the selected collection
//   //Cards have already been set to the correct collection so we just merge the new card
//   // setCards([...cards, newCard]);
//   // const updateArr = [...cards, newCard];
//   // const updatedData = collections.map((obj) => {
//   //   if (obj.name === selectedCollection) {
//   //     return { ...obj, cards: updateArr };
//   //   } else return obj;
//   // });

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createCollection,
//   editCollection,
// } from "../../../features/collections/collectionsSlice";
// //Components
// import Buttons from "./Buttons";
// import CustomTooltip from "../../Util/CustomTooltip";
// import MotionContainer from "./MotionContainer";
// import TitleDisplay from "./TitleDisplay";
// import LastStudied from "./LastStudied";
// import EditCollection from "../AddEditCollection";
// import {
//   Button,
//   Box,
//   Flex,
//   Icon,
//   GridItem,
//   IconButton,
//   useToast,
// } from "@chakra-ui/react";
// import { FiMoreVertical } from "react-icons/fi";

// interface CardProp {
//   setOrderDisplay: (val: boolean) => void;
//   collection: {
//     title: string;
//     description: string;
//     category: string;
//     id: number;
//   };
// }

// export default function Card({
//   setOrderDisplay,
//   collection: { title, description, category, id },
// }: CardProp) {
//   const toast = useToast();
//   const dispatch = useDispatch();

//   //Collection data
//   //{title, descriptiom, category, cards, id}
//   const [collectionData, setcollectionData] = useState<any>({
//     title: "",
//     description: "",
//     category: "",
//     cards: [],
//     id: "",
//   });

//   const setToast = (statusType: any, title: string) => {
//     toast({
//       title: title,
//       status: statusType,
//       duration: 2000,
//       isClosable: true,
//     });
//   };

//   //Add Cards
//   const handleAddCards = (newCard: {}) => {
//     console.log("New card", newCard);
//     setcollectionData({
//       ...collectionData,
//       cards: [...collectionData.cards, newCard],
//     });
//     //Push new card into cards arr in collectionData

//     setToast("success", "Card Added");
//   };

//   console.log("Collection Data", collectionData);

//   //Move this to the dashboard
//   const saveCollection = () => {
//     //Submit the new collection data
//     dispatch(editCollection(collectionData));
//   };

//   return (
//     <GridItem h="200px" width="100%">
//       <MotionContainer>
//         <Flex
//           flexDir={"column"}
//           justifyContent="space-between"
//           minHeight="100%"
//           p={"25px"}
//         >
//           <Flex flexDir={"column"}>
//             <Flex justify={"space-between"} align="flex-start">
//               <TitleDisplay title={title} cardCount={14} />
//               <Box>
//                 <CustomTooltip label={"Change Order"}>
//                   <IconButton
//                     onClick={() => setOrderDisplay(true)}
//                     size="sm"
//                     cursor={"move"}
//                     colorScheme={"grey"}
//                     aria-label="Change Order"
//                     icon={<Icon mt={1} as={FiMoreVertical} />}
//                   />
//                 </CustomTooltip>
//               </Box>
//             </Flex>
//           </Flex>
//           <Flex>
//             <LastStudied lastStudied={"1 day ago"} />
//           </Flex>
//           <Flex justify={"space-between"}>
//             <Buttons
//               handleAddCards={handleAddCards}
//               collection={{
//                 title: title,
//                 id: id,
//                 description: description,
//                 category: category,
//               }}
//             />
//             <Button colorScheme={"blackAlpha"} size="sm">
//               Study
//             </Button>
//           </Flex>
//         </Flex>
//       </MotionContainer>
//     </GridItem>
//   );
// }
