import React, { useState } from "react";
import axios from "axios";
import {
  Flex,
  Heading,
  Input,
  Text,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";

export default function auth() {
  // const [login, setLogin] = useState(false);

  //User State
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  //Login
  const login = async () => {
    const domain = "dev-f6e5vo5z.us.auth0.com";
    const audience = "https://www.spaced-repetition-api.com";
    //Giving permissions to logged in users
    const scope = "read:challenges";
    const clientID = "HqXAZuYWj17eEEXBeLAMR3NibABBrxsq";
    const responseType = "code";
    const redirectUri = "https://localhost:3000/collections";

    const response = fetch(
      //We want the authorise end point
      `https://${domain}/authorize` +
        `audience=${audience}&` +
        `scope=${scope}` +
        `response_type=${responseType}&` +
        `client_id=${clientID}&` +
        `redirect_uri=${redirectUri}`,
      {
        redirect: "manual",
      }
    );
    //Redirect is manual so we do this
    window.location.replace(response.url);
  };

  //Handle front and back text change
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  //Check if card already exists
  const handleSubmit = () => {
    setUserDetails({
      ...userDetails,
      email: "",
      password: "",
    });
    // handleEditCard(cardDetails);s
    axios
      .post("/createUser", userDetails)
      .then((res) => {
        alert("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Flex flexDir={"column"} align="center">
        <Heading size="md" mb={5}>
          Register
        </Heading>
        <VStack spacing={3}>
          <Input
            value={userDetails.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter your email..."
            size="md"
          />
          <Input
            value={userDetails.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password"
            size="md"
          />
          <Button
            disabled={userDetails.email === "" || userDetails.password === ""}
            onClick={() => login()}
          >
            Add Card
          </Button>
        </VStack>
      </Flex>
    </>
  );
}
