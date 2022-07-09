import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getCollections,
  editCollection,
  reset,
} from "../features/collections/collectionsSlice";
//Components
import CollectionDisplay from "../components/CollectionsNew/CollectionDisplay";
import StudyCards from "../components/StudyCards/StudyCards";
import ReorderCollections from "../components/CollectionsNew/ReorderCollections";

export default function Collections(props) {
  const { collections, isLoading, isCreated, isDeleted, isUpdated } =
    useSelector((state) => state.collection);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      // alert("activated");
      //Reset everything
      setStudyCollection({});
      setCardsNotDue([]);
      setStudyCards([]);
      setReviewedCards([]);
      //Retrieve collections on page load
      dispatch(getCollections());
      dispatch(reset());
    }
  }, [collections === null, isUpdated, isCreated, isDeleted, user]);
  //Maybe just run this function adfter upate

  //We set study mode to true and the collection
  const [orderDisplay, setOrderDisplay] = useState(false);

  const [collectionData, setCollectionData] = useState([]);
  useEffect(() => {
    //Run through and find how many cards are due based off of the due date
    const now = dayjs(Date.now()).toISOString();
    //Update the collections with cards due value
    const collectionArr = [];
    collections.map((collection) => {
      console.log(collection);
      const cards = JSON.parse(collection.cards);
      // cards.map((card) => {
      //   console.log(card.dueDate);
      //   console.log(now);
      //   if (card.dueDate < now) {
      //     console.log("less", card.dueDate);
      //   }
      // });
      //Find out how many cards are due
      const due = cards.filter((card) => card.dueDate < now);
      const collectionObj = {
        ...collection,
        cardsDue: due.length,
      };
      console.log(due);
      console.log(collectionObj);
      collectionArr.push(collectionObj);
    });
    setCollectionData(collectionArr);
    console.log("Collection arr", collectionArr);
  }, [collections]);

  console.log("Collections", collectionData);

  //Study Mode
  const [studyMode, setStudyMode] = useState(false);
  const [studyCollection, setStudyCollection] = useState({});
  //Card Types
  const [studyCards, setStudyCards] = useState([]);
  const [cardsNotDue, setCardsNotDue] = useState([]);
  const [reviewedCards, setReviewedCards] = useState([]);
  const handleStudyMode = (collection) => {
    console.log("All cards", collection.cards);
    setStudyMode(true);
    setStudyCollection(collection);
    //We need to set the study cards here and the cards not due
    const now = dayjs(Date.now()).toISOString();
    const nowJav = new Date(now);
    const cardsDue = [];
    const cardsNotDue = [];
    collection.cards.map((card) => {
      const dueDate = new Date(card.dueDate);
      const isDue = dueDate < nowJav;
      isDue ? cardsDue.push(card) : cardsNotDue.push(card);
    });
    setCardsNotDue(cardsNotDue);
    setStudyCards(cardsDue);
  };
  const resetStudyMode = () => {
    setStudyMode(false);
    handleSaveStudy();
    setStudyCollection({});
  };

  //Create progress bar showing how many cards left to study
  /*
    cards/100 -- increases a percentage width everytime a card is turned


  */

  //Save Progress studied
  const handleSaveStudy = () => {
    //We want to combine studyCards and reviewedCards
    const newCards = [...cardsNotDue, ...studyCards, ...reviewedCards];
    //When we save we should also save to the collection the nextStudyTime
    const sortedByDueDate = newCards.sort((a, b) =>
      a.dueDate.localeCompare(b.dueDate)
    );

    //Field --- nextStudyDate ---
    //Set as first item in sortedByDueDate
    // const testDates = sortedByDueDate.map((card) => {
    //   console.log(new Date(card.dueDate));
    // });

    // console.log("New cards", newCards);
    // // const newCards = [...cardsNotDue, ...studyCards, ...reviewedCards];
    const savedCollectionData = {
      ...studyCollection,
      //nextStudyDate
      nextStudyDate: sortedByDueDate[0].dueDate,
      cards: newCards,
    };
    // console.log("Saved Collection", savedCollectionData);
    //Update database with saved collection
    dispatch(editCollection(savedCollectionData));
    //Reset
    setStudyMode(false);
  };

  //When we submit we set the reviewedCards as the cards
  //in studyCollection

  //If cards not due === 0 we disable the study button and put the next due date

  return (
    <>
      {!studyMode ? (
        !orderDisplay ? (
          <CollectionDisplay
            setStudyCards={setStudyCards}
            setCardsNotDue={setCardsNotDue}
            collections={collectionData}
            isLoading={isLoading}
            handleStudyMode={handleStudyMode}
            setOrderDisplay={setOrderDisplay}
          />
        ) : (
          <ReorderCollections setOrderDisplay={setOrderDisplay} />
        )
      ) : (
        <StudyCards
          handleSaveStudy={handleSaveStudy}
          setStudyCollection={setStudyCollection}
          reviewedCards={reviewedCards}
          setReviewedCards={setReviewedCards}
          handleStudyMode={handleStudyMode}
          resetStudyMode={resetStudyMode}
          studyCollection={studyCollection}
          studyCards={studyCards}
          setStudyCards={setStudyCards}
        />
      )}
    </>
  );
}

// import React, { useState, useEffect } from "react";
// //Redux
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getCollections,
//   editCollection,
//   reset,
//   resetUpdate,
// } from "../features/collections/collectionsSlice";
// //Components
// import CollectionDisplay from "../components/CollectionsNew/CollectionDisplay";
// import StudyCards from "../components/StudyCards/StudyCards";
// import CollectionCard from "../components/CollectionsNew/CollectionCard/CollectionCard";
// import ReorderCollections from "../components/CollectionsNew/ReorderCollections";
// import AddEditCollection from "../components/CollectionsNew/AddEditCollection";
// //ChakraUI
// import { Grid, Heading, Spinner, Flex, Box } from "@chakra-ui/react";

// export default function Collections(props) {
//   const {
//     collections,
//     isLoading,
//     isError,
//     isCreated,
//     isSuccess,
//     message,
//     isDeleted,
//     isUpdated,
//   } = useSelector((state: { collection: any }) => state.collection);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     //Retrieve collections on page load
//     dispatch < any > getCollections();
//     dispatch(reset());
//   }, [collections === null, isUpdated, isCreated, isDeleted]);
//   //Maybe just run this function adfter upate

//   //We set study mode to true and the collection
//   const [orderDisplay, setOrderDisplay] = useState(false);

//   //Study Mode
//   const [studyMode, setStudyMode] = useState < boolean > false;
//   const [studyCollection, setStudyCollection] = useState < any > {};

//   const resetStudyMode = () => {
//     setStudyMode(false);
//     handleSaveStudy();
//     setStudyCollection({});
//   };
//   const handleStudyMode = (collection) => {
//     setStudyMode(true);
//     setStudyCollection(collection);
//     setStudyCards(collection.cards);
//   };

//   // const handleEditCollection = (collectionData: any) => {
//   //   //We need the id of the collection
//   //   dispatch<any>(editCollection("collections/edit", collectionData));
//   // };

//   const [studyCards, setStudyCards] = useState([]);
//   const [reviewedCards, setReviewedCards] = useState([]);
//   //Make state for study cards --- when study mode is activated we set this state

//   const handleSaveStudy = () => {
//     //We want to combine studyCards and reviewedCards
//     const newCards = [...studyCards, ...reviewedCards];
//     const savedCollectionData = {
//       ...studyCollection,
//       cards: newCards,
//     };
//     console.log("Saved Collection", savedCollectionData);
//     //Update database with saved collection
//     dispatch(editCollection(savedCollectionData));
//     setStudyMode(false);
//     console.log("Save", newCards);
//   };
//   console.log("Study cards", studyCards);
//   console.log("Reviewed cards", reviewedCards);

//   //When we submit we set the reviewedCards as the cards
//   //in studyCollection

//   return (
//     <>
//       {!studyMode ? (
//         !orderDisplay ? (
//           <CollectionDisplay
//             collections={collections}
//             isLoading={isLoading}
//             handleStudyMode={handleStudyMode}
//             setOrderDisplay={setOrderDisplay}
//           />
//         ) : (
//           <ReorderCollections setOrderDisplay={setOrderDisplay} />
//         )
//       ) : (
//         <StudyCards
//           handleSaveStudy={handleSaveStudy}
//           setStudyCollection={setStudyCollection}
//           reviewedCards={reviewedCards}
//           setReviewedCards={setReviewedCards}
//           handleStudyMode={handleStudyMode}
//           resetStudyMode={resetStudyMode}
//           studyCollection={studyCollection}
//           studyCards={studyCards}
//           setStudyCards={setStudyCards}
//         />
//       )}
//     </>
//   );
// }
