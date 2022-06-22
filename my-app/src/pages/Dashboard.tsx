import React, { useState, useEffect } from "react";
//Components
import CollectionCard from "../components/CollectionsNew/CollectionCard";
import ReorderCollections from "../components/CollectionsNew/ReorderCollections";
//ChakraUI
import { Grid } from "@chakra-ui/react";

import queryString from "query-string";

export default function Collections(props) {
  console.log(props);
  // const { code } = queryString.parse(location.search);
  // //Call dashboard backend with this code

  // const [collectionsData, setCollectionsData] = useState("");

  // useEffect(() => {
  //   fetch(`http://localhost:3001/collections?code=${code}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   }).then((res) => res.json());
  //   // .then((res) => setCollectionsData(JSON.stringify(res)));
  // }, [code]);
  const [orderDisplay, setOrderDisplay] = useState(false);

  //When we get here we want to load the user collections using the token
  //with useEffect

  return (
    <>
      {/* //Put in grid */}
      {!orderDisplay ? (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={3}
          w="100%"
        >
          <CollectionCard setOrderDisplay={setOrderDisplay} />
          <CollectionCard setOrderDisplay={setOrderDisplay} />
          <CollectionCard setOrderDisplay={setOrderDisplay} />
        </Grid>
      ) : (
        <ReorderCollections setOrderDisplay={setOrderDisplay} />
      )}
    </>
  );
}
