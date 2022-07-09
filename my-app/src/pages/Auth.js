import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Functions to dispatch
import { signup, signin } from "../features/auth/authSlice";
import {
  Input,
  VStack,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  InputGroup,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//Components
import AuthButton from "../components/Auth/AuthButton";
import AuthLayout from "../components/Layouts/AuthLayout";
import HelperText from "../components/Auth/HelperText";

export default function AuthPage({ page }) {
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector(
    //Auth state is selected from store
    (state) => state.auth
  );

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  // const [loading, setLoading] = useState(false);

  //User State
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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
    if (handleValidation()) {
      clearFields();
      page === "signin"
        ? dispatch(signin(userDetails))
        : dispatch(signup(userDetails));
    }
  };

  let title, subtitle, ariaLabel, buttonText, url, helperText, helperButton;
  if (page === "signin") {
    title = "Welcome Back";
    subtitle = "Your brain thanks you.";
    ariaLabel = "Sign in";
    buttonText = "Train your brain";
    helperText = "Don't have an account?";
    url = "/signup";
    helperButton = "Sign up";
  } else {
    title = "Welcome to Spaced";
    subtitle = "Train your brain with spaced repetition.";
    ariaLabel = "Sign up";
    buttonText = "Get Started";
    helperText = "Already have an account?";
    url = "/signin";
    helperButton = "Sign in";
  }

  //Color Mode
  const inputBorderColor = useColorModeValue(
    "input.border.light",
    "input.border.dark"
  );
  const inputTextColor = useColorModeValue("font.light", "font.dark");
  const iconColor = useColorModeValue("font.lightSubtle", "font.darkSubtle");

  return (
    <>
      <AuthLayout title={title} subtitle={subtitle}>
        <VStack spacing={3} mt={10} w="100%">
          <FormControl isRequired isInvalid={errors.email}>
            <Input
              value={userDetails.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email..."
              size="lg"
              color={inputTextColor}
              fontSize={"md"}
              borderColor={inputBorderColor}
              focusBorderColor="purple.500"
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
                color={inputTextColor}
                fontSize={"md"}
                borderColor={inputBorderColor}
                focusBorderColor="purple.500"
                errorBorderColor="red.300"
              />
              <InputRightElement>
                <IconButton
                  mt={2}
                  mr={2}
                  size="sm"
                  colorScheme={"grey"}
                  aria-label={show ? "Show Password" : "Hide Password"}
                  icon={
                    show ? (
                      <ViewOffIcon color={iconColor} />
                    ) : (
                      <ViewIcon color={iconColor} />
                    )
                  }
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
          <AuthButton
            loading={isLoadingAuth}
            buttonText={buttonText}
            ariaLabel={ariaLabel}
            handleSubmit={handleSubmit}
          />
          <HelperText
            helperText={helperText}
            url={url}
            buttonText={helperButton}
          />
        </VStack>
      </AuthLayout>
    </>
  );
}
