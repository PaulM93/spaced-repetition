import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomTooltip from "../../Util/CustomTooltip";
import {
  deleteCollection,
  resetUpdate,
} from "../../../features/collections/collectionsSlice";
import {
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus, FiEdit2, FiTrash } from "react-icons/fi";

export default function DeleteButton({ id }) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isUpdated, isCreated, isLoading, isError, isSuccess, message } =
    useSelector((state: any) => state.collection);

  //Listen for isDelte
  const handleDelete = () => {
    onToggle();
    dispatch(deleteCollection(id));
  };

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <IconButton
            onClick={onToggle}
            colorScheme={"blackAlpha"}
            size="sm"
            aria-label={"Delete Collection"}
            icon={<Icon color="#666666" as={FiTrash} />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text color="black">
              Are you sure you want to delete this collection?
            </Text>
            <Button
              isLoading={isLoading}
              // onClick={() => dispatch(() => dispatch(deleteCollection()))}
              onClick={() => handleDelete()}
              colorScheme={"red"}
            >
              Delete
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
