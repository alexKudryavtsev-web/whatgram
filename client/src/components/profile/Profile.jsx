import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Loader from "../ui/loader/Loader.jsx";
import defaultAvatar from "../../static/defaultAvatar.jpg";
import useHttp from "../../hooks/useHttp.js";
import AuthContext from "../../contexts/AuthContext.js";

function Profile() {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const response = await request(`/api/user/${auth.user.userId}`, "GET");
      setUser(response.user);
    } catch (e) {}
  }, [request, auth, setUser]);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <Box>
      <Flex align="center" justify="flex-end">
        <Button
          marginRight={2}
          leftIcon={<FaEdit />}
          onClick={() => navigate("/edit")}
          colorScheme="teal"
        >
          edit
        </Button>
      </Flex>
      <Flex justify="center" align="center" flexWrap="wrap">
        <Box>
          <Image src={defaultAvatar} boxSize="250px" borderRadius="full" />
        </Box>
        <Flex direction="column" paddingLeft={5}>
          <Text fontSize="3xl">
            <strong>{user.username}</strong>
          </Text>
          <Text fontSize="xl">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="xl">{user.description}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Profile;
