import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { FaUsers, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserPanel() {
  return (
    <Flex marginBottom={2}>
      <Button
        as={Link}
        to="/contacts"
        flex={1}
        variant="ghost"
        leftIcon={<FaUsers />}
      >
        contacts
      </Button>

      <Button as={Link} to="/" flex={1} variant="ghost" leftIcon={<FaUser />}>
        profile
      </Button>
    </Flex>
  );
}

export default UserPanel;
