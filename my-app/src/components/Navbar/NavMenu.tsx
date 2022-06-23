import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { FiUser, FiLogOut } from "react-icons/fi";

interface NavMenuProps {
  signUserOut: () => void;
}

export default function NavMenu({ signUserOut }: NavMenuProps) {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <Avatar size="xs" ml={2} bgGradient="linear(to-l, #7928CA, #FF0080)" />
      </MenuButton>
      <MenuList
        minWidth="240px"
        color="white"
        bg="#141414"
        borderColor="#262626"
      >
        <Link to="/profile">
          <MenuItem
            _focusWithin={{ bg: "black" }}
            autoFocus={false}
            fontSize="sm"
            icon={<FiUser />}
          >
            My Profile
          </MenuItem>
        </Link>
        <MenuDivider borderColor="#262626" />
        <MenuItem
          _focusWithin={{ bg: "black" }}
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
