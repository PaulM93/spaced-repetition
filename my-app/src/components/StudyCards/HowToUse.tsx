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
        <NavButton title={"How to use? 🧠"} url={""} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          p={4}
          border="1px"
          borderColor={borderColor}
          bg={background}
        >
          <ModalHeader color={color}>How to use Spaced? 🧠</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              An integer from 0-5 indicating how easily the information was
              remembered today. This could correspond to a button such as
              "Difficult" or "Very Easy." The official algorithm description
              explains the meaning of each number:
            </Text>
            <UnorderedList>
              <ListItem>5 - perfect response.</ListItem>
              <ListItem>4 - correct response after a hesitation.</ListItem>
              <ListItem>
                3 - correct response recalled with serious difficulty.
              </ListItem>
              <ListItem>
                2 - incorrect response; where the correct one seemed easy to
                recall.
              </ListItem>
              <ListItem>
                1 - incorrect response; the correct one remembered.
              </ListItem>
              <ListItem>0 - complete blackout.</ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Link isExternal href={"https://github.com/thyagoluciano/sm2"}>
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
