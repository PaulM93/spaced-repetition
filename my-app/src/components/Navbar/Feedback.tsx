import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  Textarea,
  PopoverBody,
  PopoverFooter,
  Flex,
} from "@chakra-ui/react";
//Components
import FeedbackEmojis from "./FeedbackEmojis";

export default function Feedback() {
  const [whileHover, setWhileHover] = useState<boolean>(false);
  //Get info and submit
  //Use the users signed in email to submit feedback
  const email = "useremail";
  const [data, setData] = useState({
    body: "",
    rating: null,
    email: email,
  });
  //Hook this up to nodemailer

  //Handle field changes
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const setRating = (val) => {
    setData({
      ...data,
      rating: val,
    });
  };

  const handleSubmit = () => {
    console.log(data);
    alert("Submitted");
  };

  return (
    <Popover placement="bottom" autoFocus={false}>
      <motion.div
        onHoverStart={() => setWhileHover(true)}
        onHoverEnd={() => setWhileHover(false)}
      >
        <PopoverTrigger>
          <Box position={"relative"}>
            <motion.button
              style={{
                borderRadius: "7px",
                padding: "5px 10px 5px 10px",
                color: "#ffffffb3",
                fontSize: "12px",
                border: "1px solid #262626",
                position: "absolute",
              }}
              initial={{ opacity: 1 }}
              animate={{
                opacity: whileHover ? 0 : 1,
                transition: { duration: 0.5 },
              }}
              aria-label={"Feedback"}
            >
              Feedback
            </motion.button>
            <motion.button
              style={{
                borderRadius: "7px",
                padding: "5px 10px 5px 10px",
                color: "#ffffffb3",
                fontSize: "12px",
                border: "1px solid #ffffffb3",
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: whileHover ? 1 : 0,
                transition: { duration: 0.5 },
              }}
            >
              Feedback
            </motion.button>
          </Box>
        </PopoverTrigger>
        <PopoverContent color="white" bg="#141414" borderColor="#262626">
          <PopoverArrow bg="#141414" border="none" />
          <PopoverHeader
            p={5}
            fontSize="md"
            fontWeight="normal"
            borderColor="#262626"
          >
            How can we improve?
            <PopoverCloseButton />
          </PopoverHeader>
          <PopoverBody p={5}>
            <Textarea
              variant="outline"
              fontSize={"sm"}
              borderColor={"#262626"}
              focusBorderColor="green.500"
              placeholder="What do you think?"
              id="body"
              errorBorderColor="red.300"
              onChange={handleChange}
            />
          </PopoverBody>
          <PopoverFooter p={5} borderColor="#262626">
            <Flex w="100%" justify="space-between">
              <FeedbackEmojis rating={data.rating} setRating={setRating} />
              <Button
                onClick={() => handleSubmit()}
                colorScheme={"green"}
                size="sm"
              >
                Send
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </motion.div>
    </Popover>
  );
}
