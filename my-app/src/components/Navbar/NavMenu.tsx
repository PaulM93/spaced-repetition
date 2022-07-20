import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiUser, FiLogOut } from "react-icons/fi";

interface NavMenuProps {
  signUserOut: () => void;
}

export default function NavMenu({ signUserOut }: NavMenuProps) {
  //Color Mode
  const background = useColorModeValue(
    "background.light",
    "background.subtleDark"
  );
  const color = useColorModeValue("font.light", "font.dark");
  const borderColor = useColorModeValue("#eaeaea", "border.darkSubtle");

  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <Avatar
          size="xs"
          ml={2}
          bgGradient="linear(to-l, purple.500, purple.800)"
        />
      </MenuButton>
      <MenuList
        zIndex={100}
        minWidth="240px"
        color={color}
        bg={background}
        borderColor={borderColor}
      >
        <Link to="/profile">
          <MenuItem
            fontWeight={500}
            _hover={{ background: "#805AD5", color: "#fff" }}
            autoFocus={false}
            fontSize="sm"
            icon={<FiUser />}
          >
            My Profile
          </MenuItem>
        </Link>
        <MenuDivider borderColor={borderColor} />
        <MenuItem
          fontWeight={500}
          _hover={{ background: "#805AD5", color: "#fff" }}
          autoFocus={false}
          fontSize="sm"
          icon={<FiLogOut />}
          onClick={() => signUserOut()}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
