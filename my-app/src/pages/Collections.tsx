import React, { useState, useEffect } from "react";

import queryString from "query-string";

export default function Collections({ location }) {
  const { code } = queryString.parse(location.search);
  //Call dashboard backend with this code

  const [collectionsData, setCollectionsData] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/collections?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setCollectionsData(JSON.stringify(res)));
  }, [code]);

  return (
    <>
      <div>My collections</div>
      <div>{collectionsData}</div>
    </>
  );
}
