import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../ThemeContext";
import MotionIconButton from "../Util/MotionIconButton";
import {
  createCollection,
  editCollection,
} from "../../features/collections/collectionsSlice";
import { FiPlus } from "react-icons/fi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
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
  FormHelperText,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function AddEditCollection({ type, collection }) {
  //type == add -- edit
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { isUpdated, isCreated, isLoading } = useSelector(
    (state) => state.collection
  );

  useEffect(() => {
    errorReset();
    onClose();
    // resetUpdate();
    clearFields();
  }, [isUpdated, isCreated, onClose]);

  const [collectionData, setCollectionData] = useState({
    title: "dd",
    description: "", //limit length
    category: "", //limit length,
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
        lastStudyDate: collection.lastStudyDate ? collection.lastStudyDate : "",
      });
    }
  }, [isOpen]);

  const [errors, setErrors] = useState({
    title: {
      val: false,
      message: "A title is required",
    },
    category: {
      val: false,
      message: "",
    },
  });
  const errorReset = () => {
    const errorResetObj = {
      title: {
        val: false,
        message: "A title is required",
      },
      category: {
        val: false,
        message: "",
      },
    };
    setErrors(errorResetObj);
  };

  const clearFields = () => {
    const resetObj = {
      title: "",
      description: "",
      category: "",
    };
    errorReset();
    setCollectionData(resetObj);
  };

  const handleChange = (e) => {
    setCollectionData({
      ...collectionData,
      [e.target.id]: e.target.value,
    });
  };

  const handleValidation = () => {
    let fields = collectionData;
    let errors = {};
    let formIsValid = true;
    // const fieldArr = ["title", "category"];
    const fieldArr = [
      { type: "title", val: true, message: "Please enter a title" },
      { type: "category", val: true, message: "hdfdselo" },
    ];
    console.log("fields", fields);
    fieldArr.map((i) => {
      console.log(fields[i.type]);
      if (fields[i.type] === "") {
        formIsValid = false;
        return {
          errors: { title: { val: fields[i].val, message: fields[i].message } },
        };
      }
    });
    alert("here");
    // console.log("errors", errors);
    setErrors(errors);
    // return formIsValid;
    return formIsValid;
  };
  console.log("There are the errors", errors);
  const [categoryError, setCategoryError] = useState(false);
  const handleSubmit = () => {
    // if (collectionData.category.length < 15) {
    if (handleValidation()) {
      if (type === "add") {
        dispatch(createCollection(collectionData));
      }
      if (type === "edit") {
        dispatch(editCollection(collectionData));
      }
    }
    // } else {
    //   setCategoryError(true);
    // }
  };

  const [onHover, setOnHover] = useState(false);
  const addButton = (
    <motion.button
      onHoverStart={() => setOnHover(true)}
      onHoverEnd={() => setOnHover(false)}
      whileHover={{
        paddingRight: "30px",
        transition: {
          duration: 0.2,
        },
      }}
      // whileHover={{ width: "145px" }}
      onClick={onOpen}
      style={theme.buttons.addCollectionButton}
    >
      Add Collection
      <motion.button
        style={{
          position: "absolute",
          marginLeft: "7px",
          marginTop: "3px",
        }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: onHover ? 1 : 0, rotate: onHover ? 360 : 0 }}
      >
        <FiPlus />
      </motion.button>
    </motion.button>
  );

  const editButton = (
    <Box onClick={onOpen}>
      <MotionIconButton iconType={"edit"} label={"Edit Collection"} />
    </Box>
  );

  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");
  const inputColor = useColorModeValue(
    "input.border.light",
    "input.border.dark"
  );
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
      {type === "add" ? addButton : editButton}

      {/* <MotionIconButton iconType={"edit"} /> */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        // isOpen={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          bg={background}
          p={4}
          border="1px"
          borderColor={borderColor}
        >
          <ModalHeader color={color}>
            {type === "add" ? "Add a Collection" : "Edit your collection"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.title.val}>
              <FormLabel fontSize={"sm"}>Title</FormLabel>
              <Input
                variant="outline"
                borderColor={inputColor}
                focusBorderColor="purple.500"
                errorBorderColor="red.300"
                value={collectionData.title}
                onChange={handleChange}
                id="title"
                placeholder="Enter collection title..."
                size="md"
              />
              {errors.title ? (
                <FormErrorMessage color="red.500" size="sm">
                  A title is required.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={errors.category.val}>
              <FormLabel fontSize={"sm"}>Category</FormLabel>
              <Input
                variant="outline"
                borderColor={inputColor}
                focusBorderColor="purple.500"
                errorBorderColor="red.300"
                value={collectionData.category}
                onChange={handleChange}
                id="category"
                placeholder="Enter collection category..."
                size="md"
              />
              {errors.category ? (
                <FormErrorMessage color="red.500" size="sm">
                  A category is required.
                </FormErrorMessage>
              ) : !categoryError ? (
                <FormHelperText size="sm">15 character max</FormHelperText>
              ) : (
                <FormErrorMessage color="red.500" size="sm">
                  15 character max
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={categoryError}>
              <FormLabel fontSize={"sm"}>Description</FormLabel>
              <Textarea
                variant="outline"
                fontSize={"md"}
                borderColor={inputColor}
                focusBorderColor="purple.500"
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
              size="sm"
              variant="solid"
              isLoading={isLoading}
              onClick={() => handleSubmit()}
              colorScheme="purple"
              mr={3}
            >
              Submit
            </Button>
            <Button variant="solid" size="sm" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
