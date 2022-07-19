import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MotionIconButton from "../../Util/MotionIconButton";
import { deleteCollection } from "../../../features/collections/collectionsSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
  Flex,
  Box,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

export default function DeleteButton({ id }) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.collection);

  //Color Mode
  const background = useColorModeValue(
    "background.subtleLight",
    "background.subtleDark"
  );
  const color = useColorModeValue("font.light", "font.dark");
  const borderColor = useColorModeValue(
    "border.lightSubtle",
    "border.darkSubtle"
  );

  //Listen for isDelte
  const handleDelete = () => {
    onToggle();
    dispatch(deleteCollection(id));
  };

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Box onClick={() => onToggle()}>
            <MotionIconButton label={""} iconType={"delete"} />
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
          <PopoverCloseButton color={color} />
          <PopoverBody p={4} color={color}>
            <Text>Are you sure you want to delete this collection?</Text>
            <Flex justify={"flex-end"}>
              <Button
                isLoading={isLoading}
                onClick={() => handleDelete()}
                colorScheme={"red"}
                size="sm"
              >
                Delete
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
