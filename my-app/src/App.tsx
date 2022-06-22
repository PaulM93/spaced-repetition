import React, { useState } from "react";
import dayjs from "dayjs";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { supermemo, SuperMemoItem, SuperMemoGrade } from "supermemo";
//Components
import Layout from "./components/Layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
//Pages
import Home from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App({ props }) {
  console.log("App props", props);
  //We create the flashcard -- pass in the data --- front and back through inputs
  //Store all flashcards in a "review" array
  //Run through all the flashcards depending on the due date
  //Update the efactor values
  //Save to database

  // const collectionArr = [{
  //   cards: [{}],
  //   name: string;
  //   id: string;
  //   type: string; //language, sports etc
  //   createdAt: string;
  // }]

  //Ability to create another collection of cards - they have names
  //Spanish collection
  //Chinese collection etc

  interface Collection {
    cards: [{}];
    name: string;
    id: string;
    category: string; //language, sports etc
    createdAt: string;
  }

  //Create collections same way as cards
  const collectionArr = [
    {
      cards: [
        {
          front: "hola",
          back: "hello",
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          dueDate: dayjs(Date.now()).toISOString(),
          id: "sdsdfsd",
        },
        {
          front: "chao",
          back: "goodbye",
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          dueDate: dayjs(Date.now()).toISOString(),
          id: "dsfsdfsd",
        },
      ],
      name: "Spanish",
      id: "dssdgdsga",
      category: "Language", //language, sports etc
      createdAt: new Date(),
    },
    {
      cards: [
        {
          front: "fart",
          back: "hello",
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          dueDate: dayjs(Date.now()).toISOString(),
          id: "sdsdfsd",
        },
        {
          front: "poop",
          back: "goodbye",
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          dueDate: dayjs(Date.now()).toISOString(),
          id: "dsfsdfsd",
        },
      ],
      name: "English",
      id: "ssdfsdf",
      category: "Other", //language, sports etc
      createdAt: new Date(),
    },
  ];

  //Collections
  const [collections, setCollections] = useState<any>(collectionArr);
  //This is the collection array -- we can push collections of cards here

  //Cards are initially stored here from each collection

  //We then cycle through them pushing them into the review cards stte

  // console.log("Reviewed Cards", reviewedCards);
  //Save adds the reviewed cards back into the setCards state
  //We could save to database and replace existing.
  //If all cards are not reviewed we combine reviewed cards state with cards state

  //We need to cycle through the cards
  /*
    1) Cycle through cards
    2) Add Cards to new array 
    3) When complete we update the cards array with the new values
  */

  // repetition: the number of continous correct responses. The initial repetition value should be 0.
  // interval: inter-repetition interval after the repetitions (in days). The initial interval value should be 0.
  // efactor: easiness factor reflecting the easiness of memorizing and retaining a given item in memory. The initial efactor value should be 2.5.
  //Button State
  // const [navVal, setNavVal] = useState("Review Cards");
  // let markup;
  // switch (navVal) {
  //   case "Add Collection":
  //     markup = (
  //       <CreateCollection
  //         setNavVal={setNavVal}
  //         collections={collections}
  //         setCollections={setCollections}
  //       />
  //     );
  //     break;
  //   case "Review Cards":
  //     markup = (
  //       <ReviewCollections
  //         setCollections={setCollections}
  //         collections={collections}
  //       />
  //     );
  //     break;
  //   default:
  // }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Auth page={"signup"} />} />
          <Route path="/signin" element={<Auth page={"signin"} />} />
          {/* <Route path="/addCollection" element={<AddCollection />} /> */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;

/*
  Tables
  //////
  1) Users
  2) Collections -- each collection is assosiated with a user -- store cards as json array 


  //Auth Process
  1) User signs in / up
  2) Taken to their collection page

  Collection Page
  ///////////////
  - User Can add new collection 
  - User Can delete a collection
  - User Can edit a collection

*/
