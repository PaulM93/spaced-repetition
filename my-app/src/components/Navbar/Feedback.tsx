import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
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
  useColorModeValue,
} from "@chakra-ui/react";
//Components
import FeedbackEmojis from "./FeedbackEmojis";

export default function Feedback() {
  //Color Mode
  const background = useColorModeValue(
    "background.light",
    "background.subtleDark"
  );
  const color = useColorModeValue("font.light", "font.dark");
  const borderColor = useColorModeValue(
    "border.lightSubtle",
    "border.darkSubtle"
  );
  const inputColor = useColorModeValue(
    "input.border.light",
    "input.border.dark"
  );
  const inputTextColor = useColorModeValue("font.light", "font.dark");

  const { theme } = useTheme();
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
    alert("Not working atm");
  };

  return (
    <Popover placement="bottom" autoFocus={false}>
      <motion.div
        style={{ zIndex: 50 }}
        onHoverStart={() => setWhileHover(true)}
        onHoverEnd={() => setWhileHover(false)}
      >
        <PopoverTrigger>
          <Box position={"relative"}>
            <motion.button
              style={theme.buttons.navButton.initial}
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
              style={theme.buttons.navButton.hover}
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
        <PopoverContent
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
          }
          color="white"
          bg={background}
          borderColor={borderColor}
        >
          <PopoverArrow bg={background} border="none" />
          <PopoverHeader
            p={5}
            fontSize="md"
            color={color}
            fontWeight="500"
            borderColor={borderColor}
          >
            How can we improve?
            <PopoverCloseButton />
          </PopoverHeader>
          <PopoverBody p={5}>
            <Textarea
              variant="outline"
              fontSize={"sm"}
              borderColor={inputColor}
              color={inputTextColor}
              focusBorderColor="purple.500"
              placeholder="What do you think?"
              id="body"
              errorBorderColor="red.300"
              onChange={handleChange}
            />
          </PopoverBody>
          <PopoverFooter p={5} borderColor={borderColor}>
            <Flex w="100%" justify="space-between">
              <FeedbackEmojis rating={data.rating} setRating={setRating} />
              <Button
                onClick={() => handleSubmit()}
                colorScheme={"purple"}
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
