import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Box,
  Input,
  Text,
  VStack,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  useToast,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//Components
import AuthLayout from "../components/Layouts/AuthLayout";

export default function Signup() {
  const toast = useToast();
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(!show);
  const [loading, setLoading] = useState<boolean>(false);
  const [whileHover, setWhileHover] = useState<boolean>(false);

  //User State
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({
    email: false,
    password: false,
  });
  const handleValidation = () => {
    let fields = userDetails;
    let errors = {};
    let formIsValid = true;

    const fieldArr = ["email", "password"];
    //Name - Message
    fieldArr.map((i) => {
      if (!fields[i]) {
        formIsValid = false;
        return (errors[i] = true);
      }
    });

    setErrors(errors);
    return formIsValid;
  };

  //Handle front and back text change
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const clearFields = () => {
    const resetObj = {
      email: "",
      password: "",
    };
    setUserDetails(resetObj);
  };

  //Check if card already exists
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      axios
        .post("/users", userDetails)
        .then((res) => {
          console.log("success", res);
          clearFields();
          setLoading(false);
          toast({
            title: "Profile Created",
            status: "success",
            position: "bottom-left",
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast({
            title: "There was an error",
            status: "error",
            position: "bottom-left",
            isClosable: true,
          });
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title={"Welcome to Spaced"}
        subtitle={"Train your brain with spaced repetition."}
      >
        <VStack spacing={3} mt={10} w="100%">
          <FormControl isRequired isInvalid={errors.email}>
            <Input
              value={userDetails.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email..."
              size="lg"
              color="#ffffff"
              fontSize={"md"}
              borderColor={"#262626"}
              focusBorderColor="purple.400"
              errorBorderColor="red.300"
            />
            {errors.email ? (
              <FormErrorMessage color="red.300">
                Your email is required.
              </FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errors.email}>
            <InputGroup size="md">
              <Input
                value={userDetails.password}
                onChange={handleChange}
                id="password"
                placeholder="Enter your password"
                size="lg"
                type={show ? "text" : "password"}
                color="#ffffff"
                fontSize={"md"}
                borderColor={"#262626"}
                focusBorderColor="purple.400"
                errorBorderColor="red.300"
              />
              <InputRightElement>
                <IconButton
                  mt={2}
                  mr={2}
                  size="sm"
                  colorScheme={"grey"}
                  aria-label={show ? "Show Password" : "Hide Password"}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleShow}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password ? (
              <FormErrorMessage color="red.300">
                Your password is required.
              </FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>
          <Box
            position={"relative"}
            width="100%"
            onClick={(e) => handleSubmit(e)}
          >
            <motion.button
              style={{
                borderRadius: "7px",
                padding: "10px 20px 10px 20px",
                color: "white",
                width: "100%",
                fontSize: "16px",
                background: "#7928CA",
                border: "1px solid #7928CA",
                position: "absolute",
              }}
              initial={{ opacity: 1 }}
              animate={{
                opacity: whileHover ? 0 : 1,
                transition: { duration: 0.5 },
              }}
              aria-label={"Sign up"}
            >
              {!loading ? "Get Started" : "Loading..."}
            </motion.button>
            <motion.button
              onHoverStart={() => setWhileHover(true)}
              onHoverEnd={() => setWhileHover(false)}
              style={{
                borderRadius: "7px",
                width: "100%",
                padding: "10px 20px 10px 20px",
                color: "#ffffffb3",
                fontSize: "16px",
                border: "1px solid #ffffffb3",
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: whileHover ? 1 : 0,
                transition: { duration: 0.5 },
              }}
            >
              {!loading ? "Get Started" : "Loading..."}
            </motion.button>
          </Box>
          <Text fontSize={"sm"} color="#ffffffb3">
            Already have an account?{" "}
            <Link to="/signin">
              <span style={{ color: "#ffffff" }}>Sign in</span>
            </Link>
          </Text>
        </VStack>
      </AuthLayout>
    </>
  );
}
