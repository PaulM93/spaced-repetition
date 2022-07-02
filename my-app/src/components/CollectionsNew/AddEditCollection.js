import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCollection,
  editCollection,
} from "../../features/collections/collectionsSlice";
import CustomTooltip from "../Util/CustomTooltip";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  IconButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiEdit2 } from "react-icons/fi";

export default function AddEditCollection({ type, collection }) {
  //type == add -- edit
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { isUpdated, isCreated, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.collection);

  useEffect(() => {
    onClose();
    // resetUpdate();
    clearFields();
  }, [isUpdated, isCreated]);

  //   interface CollectionData {
  //     title: String;
  //     description: String;
  //     category: String;
  //   }
  const [collectionData, setCollectionData] = useState({
    title: "",
    description: "", //limit length
    category: "", //limit length,
    // cards: [],
  });

  //If type is edit set details
  useEffect(() => {
    if (type === "edit") {
      setCollectionData({
        title: collection.title ? collection.title : "",
        description: collection.description ? collection.description : "",
        category: collection.category ? collection.category : "",
        id: collection.id ? collection.id : "",
        cards: collection.cards ? collection.cards : [],
        nextStudyDate: collection.nextStudyDate ? collection.nextStudyDate : "",
      });
    }
  }, [isOpen]);

  const clearFields = () => {
    const resetObj = {
      title: "",
      description: "",
      category: "",
    };
    setCollectionData(resetObj);
  };

  const handleChange = (e) => {
    setCollectionData({
      ...collectionData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (collectionData.title !== "" && collectionData.category !== "") {
      if (type === "add") {
        // console.log("Collection", collectionData);
        dispatch(createCollection(collectionData));
      }
      if (type === "edit") {
        // alert("edit from modal activated");
        dispatch(editCollection(collectionData));
      }
    } else {
      //Set errors ie.. title or category not filled
      alert("error");
    }
  };

  const addButton = (
    <motion.button
      onClick={onOpen}
      style={{
        borderRadius: "7px",
        padding: "5px 10px 5px 10px",
        color: "#FF0080",
        fontSize: "12px",
        border: "1px solid #FF0080",
      }}
    >
      Add Collection
    </motion.button>
  );

  const editButton = (
    <CustomTooltip label={"Edit collection"}>
      <IconButton
        onClick={onOpen}
        colorScheme={"blackAlpha"}
        size="sm"
        aria-label={"Edit collection"}
        icon={<Icon color="#666666" as={FiEdit2} />}
      />
    </CustomTooltip>
  );

  return (
    <>
      {type === "add" ? addButton : editButton}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {type === "add" ? "Add a Collection" : "Edit your collection"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                variant="outline"
                borderColor={"#262626"}
                focusBorderColor="green.500"
                errorBorderColor="red.300"
                value={collectionData.title}
                onChange={handleChange}
                id="title"
                placeholder="Enter collection title..."
                size="md"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                variant="outline"
                borderColor={"#262626"}
                focusBorderColor="green.500"
                errorBorderColor="red.300"
                value={collectionData.category}
                onChange={handleChange}
                id="category"
                placeholder="Enter collection category..."
                size="md"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                variant="outline"
                fontSize={"md"}
                borderColor={"#262626"}
                focusBorderColor="green.500"
                value={collectionData.description}
                placeholder="What is your collection?"
                id="description"
                errorBorderColor="red.300"
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              onClick={() => handleSubmit()}
              colorScheme="blue"
              mr={3}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
