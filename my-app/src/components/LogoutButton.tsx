import React from "react";
import { Button, Box, Flex, Divider, ChakraProvider } from "@chakra-ui/react";

export default function LogoutButton() {
  const logout = async () => {
    const domain = "dev-f6e5vo5z.us.auth0.com";
    const clientID = "HqXAZuYWj17eEEXBeLAMR3NibABBrxsq";
    const returnTo = "http://localhost:3000";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientID}&returnTo=${returnTo}`,
      {
        redirect: "manual",
      }
    );
    //Redirect is manual so we do this
    window.location.replace(response.url);
  };

  return (
    <Button variant={"solid"} onClick={() => logout()} colorScheme="facebook">
      Logout
    </Button>
  );
}
