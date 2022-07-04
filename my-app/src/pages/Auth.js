import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Functions to dispatch
import { signup, signin, reset } from "../features/auth/authSlice";
import {
  Input,
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
import AuthButton from "../components/Auth/AuthButton";
import AuthLayout from "../components/Layouts/AuthLayout";
import HelperText from "../components/Auth/HelperText";

export default function AuthPage({ page }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    //Auth state is selected from store
    (state) => state.auth
  );
  useEffect(() => {
    //Check if their is an error
    if (isError) {
      return toast({
        title: message,
        status: "error",
        position: "bottom-left",
        isClosable: true,
      });
    }
    //If signup is fulfilled isSuccess === true || user
    if (isSuccess && user) {
      // if (isSuccess || user) {
      console.log(isSuccess);
      console.log(user);
      //We navigate to the dashboard
      navigate("/dashboard");
      clearFields();
      const toastMessage =
        page === "signin" ? "Successfully signed in" : "Successfully signed up";
      toasty(toastMessage, "success");
      //We then dispatch the reset reducer in authSlice to reset loading, errors etc
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  //On dahboard user userID to access collections etc

  const toast = useToast();
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

  const toasty = (message, type) => {
    return toast({
      title: message,
      status: type,
      position: "bottom-left",
      isClosable: true,
    });
  };

  //Check if card already exists
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
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
  console.log(helperText);
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
          <AuthButton
            loading={isLoading}
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
