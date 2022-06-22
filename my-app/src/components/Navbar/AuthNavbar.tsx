import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//Components
import NavButton from "./NavButton";
import Logo from "./Logo";
import Feedback from "./Feedback";
import CustomTooltip from "../Util/CustomTooltip";
////////
import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
export default function AuthNavbar() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUserOut = () => {
    dispatch<any>(logout());
    dispatch(reset());
    navigate("/");
    toast({
      title: "Signed out",
      status: "success",
      position: "bottom-left",
      isClosable: true,
    });
  };

  return (
    <Flex
      pt={2}
      h="110px"
      w="100%"
      borderBottom="1px solid #262626"
      justify="center"
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
      }
    >
      <Flex
        width={["90%", "90%", "90%", "60%"]}
        h="100%"
        flexDir="column"
        pb={2}
        align="space-between"
      >
        <Flex
          h="50%"
          width="100%"
          align="center"
          justifyContent={"space-between"}
        >
          <Logo />
          <Flex align="center">
            <Feedback />
            <Avatar size="xs" ml={2} bg="#1DB954" />
          </Flex>
        </Flex>
        <Flex h="50%" width="100%" align="center" justify={"space-between"}>
          <HStack spacing={1}>
            <NavButton title={"Overview"} url={"/"} />
            <NavButton title={"Settings"} url={"settings"} />
          </HStack>
          <HStack>
            <Link to="/collectionOrder">
              <CustomTooltip label={"Change Card Order"}>
                <IconButton
                  size="xs"
                  colorScheme={"grey"}
                  aria-label="Change Card Order"
                  icon={<Icon mt={1} as={DragHandleIcon} />}
                />
              </CustomTooltip>
            </Link>
            <Link to="/addCollection">
              <motion.button
                style={{
                  borderRadius: "7px",
                  padding: "5px 10px 5px 10px",
                  color: "#1DB954",
                  fontSize: "12px",
                  border: "1px solid #1DB954",
                }}
              >
                Add Collection
              </motion.button>
            </Link>
            <motion.button
              onClick={() => signUserOut()}
              style={{
                borderRadius: "7px",
                padding: "5px 10px 5px 10px",
                color: "#1DB954",
                fontSize: "12px",
                border: "1px solid #1DB954",
              }}
            >
              Logout
            </motion.button>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
