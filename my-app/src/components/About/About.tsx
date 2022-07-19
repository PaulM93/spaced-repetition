import React from "react";
import NavButton from "../Navbar/NavButton";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,
  Text,
  Link,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");

  const background = useColorModeValue(
    "background.subtleLight",
    "background.subtleDark"
  );
  const borderColor = useColorModeValue(
    "border.lightSubtle",
    "border.darkSubtle"
  );

  return (
    <>
      <Box onClick={onOpen}>
        <NavButton title={"Find out more 🧠"} url={""} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          p={4}
          border="1px"
          borderColor={borderColor}
          bg={background}
        >
          <ModalHeader color={color}>What is Spaced Repetition? 🧠</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Spaced repetition is a powerful technique that will help you
              memorize information in much less time than it would take
              otherwise. The idea of spaced repetition is to space out your
              repetitions, or review sessions, so that you are not trying to
              cram all the knowledge into your brain at once.
            </Text>
            <Text mb={4}>
              Besides improving memory, These are some of the biggest benefits
              of spaced repetition:
            </Text>
            <UnorderedList>
              <ListItem>
                Continually re-exposes you to information at spaced intervals
              </ListItem>
              <ListItem>
                Helps your brain build memories that have high levels of storage
                strength.
              </ListItem>
              <ListItem>
                Increases the time spent actively rehearsing a memory in your
                brain rather than passively consuming information.
              </ListItem>
              <ListItem>
                Allows for consolidation of new information with old related
                knowledge that has already been stored in long-term memory,
                making it easier to retrieve and recall the information at later
                dates.
              </ListItem>
              <ListItem>
                Having a predictable spaced repetition schedule teaches your
                brain to predict when it will next see the material and respond
                with greater alertness and attention, making it easier for
                information in that time frame to be encoded into long-term
                memory.
              </ListItem>
              <ListItem>
                The technique allows you to break up larger tasks into smaller
                chunks of work spaced at intervals throughout the day (e.g.,
                break one chapter into three sections): an approach called
                chunking.
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Link isExternal href={"https://e-student.org/spaced-repetition/"}>
              <Button size="sm" variant="solid" colorScheme={"purple"}>
                Further Info <ExternalLinkIcon ml="5px" />
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
