import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Center,
  Divider,
  Text,
  HStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";
import defaultAvatar from "../../static/defaultAvatar.jpg";
import makeAppeal from "../../utils/makeAppeal.js";

function ContactItem({ contactId, users }) {
  const navigate = useNavigate();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    const userId = users[0] === auth.user.userId ? users[1] : users[0];
    const response = await request(`/api/user/${userId}`, "GET");
    setUser(response.user);
  }, [auth, request, setUser, users]);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <HStack align="center" onClick={() => navigate(`/dialog/${contactId}`)}>
        <Box>
          <Image boxSize={50} borderRadius="full" src={defaultAvatar} />
        </Box>
        <Box flex={1}>
          <Text fontSize="2xl" align="start">
            {makeAppeal(user.firstName, user.lastName, user.username)}
          </Text>
        </Box>
        <Box flex={1}>
          <Text fontSize="md">{user.description}</Text>
        </Box>
      </HStack>
      <Divider />
    </>
  );
}

export default ContactItem;
