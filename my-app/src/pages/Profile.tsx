import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Button,
  Heading,
  VStack,
  Text,
  Input,
  Textarea,
} from "@chakra-ui/react";

export default function Profile(props) {
  const navigate = useNavigate();
  const { user } = useSelector(
    //Auth state is selected from store
    (state: any) => state.auth
  );

  //Populate with data
  const [selectedPage, setSelectedPage] = useState("General");
  const [userDetails, setUserDetails] = useState({
    username: "",
    bio: "",
  });

  useEffect(() => {
    !user
      ? navigate("/")
      : setUserDetails({
          ...userDetails,
          username: user.username,
          bio: user.bio,
        });
  }, [user, props]);

  const buttonArr = ["General", "Settings", "Logout"];
  const buttonMarkup = (
    <VStack minWidth={"100%"}>
      {buttonArr.map((button) => (
        <motion.button
          onClick={() => setSelectedPage(button)}
          style={{
            minWidth: "100%",
            padding: "10px",
            border:
              selectedPage === button ? "1px solid #fff" : "1px solid #262626",
            fontSize: "12px",
            borderRadius: "7px",
            color: "#ffffffb3",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          //Put cool subtle animation of gray background which moves
        >
          {button}
        </motion.button>
      ))}
    </VStack>
  );

  //Handle front and back text change
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post("/user", userDetails)
      .then((res) => {
        alert("updated");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Flex width={"100%"} mt={5}>
      <Flex mr={2} width="30%">
        {buttonMarkup}
      </Flex>
      <Flex
        width="70%"
        border="1px solid #262626"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
        borderRadius={"5px"}
        color="#fafafa"
        p={10}
        justify={"center"}
        borderBottom="1px solid #262626"
      >
        <Flex
          flexDir={"column"}
          align="flex-start"
          width={"100%"}
          justify="flex-start"
        >
          <Box mb={5}>
            <Heading size="sm">Your Details</Heading>
            <Text fontSize={"sm"} color="#ffffffb3">
              Update your details within Spaced
            </Text>
          </Box>

          <Box mb={2}>
            <Text fontSize={"xs"} mb="8px">
              UserName:
            </Text>
            <Input
              value={userDetails.username}
              onChange={handleChange}
              minWidth={"250px"}
              id="username"
              placeholder="Enter your username..."
              size="md"
              color="#ffffff"
              fontSize={"sm"}
              borderColor={"#262626"}
              focusBorderColor="purple.400"
              errorBorderColor="red.300"
            />
          </Box>
          <Flex w="100%" justify="space-between" align={"flex-end"}>
            <Box>
              <Text fontSize={"xs"} mb="8px">
                Bio
              </Text>
              <Textarea
                minWidth={"250px"}
                value={userDetails.bio}
                variant="outline"
                fontSize={"sm"}
                borderColor={"#262626"}
                focusBorderColor="purple.400"
                placeholder="Tell us a bit about you..."
                id="body"
                errorBorderColor="red.300"
                onChange={handleChange}
              />
            </Box>
            <Button
              onClick={() => handleSubmit()}
              size="sm"
              variant="outline"
              colorScheme={"pink"}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
