import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//Functions to dispatch
import { signup, signin, reset } from "../features/auth/authSlice";
import axios from "axios";
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
      toasty("Successfully signed up", "success");
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

  // const signin = () => {
  //   axios
  //     .post("/login", userDetails)
  //     .then((res) => {
  //       clearFields();
  //       setLoading(false);
  //       toasty("Signed in", "success");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //       toasty("There was an error", "error");
  //     });
  // };

  const signupUser = () => {
    //Dispatch signup function in redux
    dispatch(signup(userDetails));

    // axios
    //   .post("/users", userDetails)
    //   .then((res) => {
    //     clearFields();
    //     setLoading(false);
    //     toasty("Profile Created", "success");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //     toasty("There was an error", "error");
    //   });
  };

  //Check if card already exists
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      signupUser();
      page === "signin"
        ? dispatch(signin(userDetails))
        : dispatch(signup(userDetails));
    }
  };

  let title, subtitle, ariaLabel, buttonText, url, helperText;
  if (page === "signin") {
    title = "Welcome Back";
    subtitle = "Your brain thanks you.";
    ariaLabel = "Sign in";
    buttonText = "Train your brain";
    helperText = "Already have an account?";
    url = "/signin";
  } else {
    title = "Welcome to Spaced";
    subtitle = "Train your brain with spaced repetition.";
    ariaLabel = "Sign up";
    buttonText = "Get Started";
    helperText = "Dont have an account?";
    url = "/signup";
  }
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
            buttonText={ariaLabel}
          />
        </VStack>
      </AuthLayout>
    </>
  );
}
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// //Functions to dispatch
// import { signup, reset } from "../features/auth/authSlice";
// import axios from "axios";
// import {
//   Input,
//   VStack,
//   InputRightElement,
//   FormControl,
//   FormErrorMessage,
//   useToast,
//   InputGroup,
//   IconButton,
// } from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// //Components
// import AuthButton from "../components/Auth/AuthButton";
// import AuthLayout from "../components/Layouts/AuthLayout";
// import HelperText from "../components/Auth/HelperText";

// interface AuthPageProps {
//   page: string;
// }

// export default function AuthPage({ page }: AuthPageProps) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state: { auth: any }) => state.auth
//   );
//   console.log("User", isLoading);

//   const toast = useToast();
//   const [show, setShow] = useState < boolean > false;
//   const handleShow = () => setShow(!show);
//   const [loading, setLoading] = useState < boolean > false;

//   //User State
//   const [userDetails, setUserDetails] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] =
//     useState <
//     any >
//     {
//       email: false,
//       password: false,
//     };
//   const handleValidation = () => {
//     let fields = userDetails;
//     let errors = {};
//     let formIsValid = true;

//     const fieldArr = ["email", "password"];
//     //Name - Message
//     fieldArr.map((i) => {
//       if (!fields[i]) {
//         formIsValid = false;
//         return (errors[i] = true);
//       }
//     });

//     setErrors(errors);
//     return formIsValid;
//   };

//   //Handle front and back text change
//   const handleChange = (e) => {
//     setUserDetails({
//       ...userDetails,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const clearFields = () => {
//     const resetObj = {
//       email: "",
//       password: "",
//     };
//     setUserDetails(resetObj);
//   };

//   const toasty = (
//     message: string,
//     type: "loading" | "info" | "warning" | "success" | "error"
//   ) => {
//     return toast({
//       title: message,
//       status: type,
//       position: "bottom-left",
//       isClosable: true,
//     });
//   };

//   const signin = () => {
//     axios
//       .post("/login", userDetails)
//       .then((res) => {
//         clearFields();
//         setLoading(false);
//         toasty("Signed in", "success");
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//         toasty("There was an error", "error");
//       });
//   };

//   const signupUser = () => {
//     dispatch(signup(userDetails));
//     // axios
//     //   .post("/users", userDetails)
//     //   .then((res) => {
//     //     clearFields();
//     //     setLoading(false);
//     //     toasty("Profile Created", "success");
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //     setLoading(false);
//     //     toasty("There was an error", "error");
//     //   });
//   };

//   //Check if card already exists
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     if (handleValidation()) {
//       page === "signin" ? signin() : signupUser();
//     } else {
//       setLoading(false);
//     }
//   };

//   let title: string,
//     subtitle: string,
//     ariaLabel: string,
//     buttonText: string,
//     url: string,
//     helperText: string;
//   if (page === "signin") {
//     title = "Welcome Back";
//     subtitle = "Your brain thanks you.";
//     ariaLabel = "Sign in";
//     buttonText = "Train your brain";
//     helperText = "Already have an account?";
//     url = "/signin";
//   } else {
//     title = "Welcome to Spaced";
//     subtitle = "Train your brain with spaced repetition.";
//     ariaLabel = "Sign up";
//     buttonText = "Get Started";
//     helperText = "Dont have an account?";
//     url = "/signup";
//   }
//   return (
//     <>
//       <AuthLayout title={title} subtitle={subtitle}>
//         <VStack spacing={3} mt={10} w="100%">
//           <FormControl isRequired isInvalid={errors.email}>
//             <Input
//               value={userDetails.email}
//               onChange={handleChange}
//               id="email"
//               placeholder="Enter your email..."
//               size="lg"
//               color="#ffffff"
//               fontSize={"md"}
//               borderColor={"#262626"}
//               focusBorderColor="purple.400"
//               errorBorderColor="red.300"
//             />
//             {errors.email ? (
//               <FormErrorMessage color="red.300">
//                 Your email is required.
//               </FormErrorMessage>
//             ) : (
//               ""
//             )}
//           </FormControl>
//           <FormControl isRequired isInvalid={errors.email}>
//             <InputGroup size="md">
//               <Input
//                 value={userDetails.password}
//                 onChange={handleChange}
//                 id="password"
//                 placeholder="Enter your password"
//                 size="lg"
//                 type={show ? "text" : "password"}
//                 color="#ffffff"
//                 fontSize={"md"}
//                 borderColor={"#262626"}
//                 focusBorderColor="purple.400"
//                 errorBorderColor="red.300"
//               />
//               <InputRightElement>
//                 <IconButton
//                   mt={2}
//                   mr={2}
//                   size="sm"
//                   colorScheme={"grey"}
//                   aria-label={show ? "Show Password" : "Hide Password"}
//                   icon={show ? <ViewOffIcon /> : <ViewIcon />}
//                   onClick={handleShow}
//                 />
//               </InputRightElement>
//             </InputGroup>
//             {errors.password ? (
//               <FormErrorMessage color="red.300">
//                 Your password is required.
//               </FormErrorMessage>
//             ) : (
//               ""
//             )}
//           </FormControl>
//           <AuthButton
//             loading={loading}
//             buttonText={buttonText}
//             ariaLabel={ariaLabel}
//             handleSubmit={handleSubmit}
//           />
//           <HelperText
//             helperText={helperText}
//             url={url}
//             buttonText={ariaLabel}
//           />
//         </VStack>
//       </AuthLayout>
//     </>
//   );
// }
