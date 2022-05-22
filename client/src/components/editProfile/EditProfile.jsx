import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import AuthContext from "../../contexts/AuthContext.js";
import Loader from "../ui/loader/Loader.jsx";
import useHttp from "../../hooks/useHttp.js";

function EditProfile() {
  const navigate = useNavigate();
  const { request } = useHttp();
  const [user, setUser] = useState(null);
  const auth = useContext(AuthContext);

  const fetchUser = useCallback(async () => {
    try {
      const response = await request(`/api/user/${auth.user.userId}`, "GET");
      setUser(response.user);
    } catch (e) {}
  }, [request, auth, setUser]);

  useEffect(() => {
    fetchUser();
  }, []);

  function changeHandler(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function saveBtnHandler() {
    await request("/api/user", "PUT", user, auth.calculateHeader(), auth);
    navigate("/");
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <VStack align="stretch" padding={2}>
      <Box>
        <Input
          value={user.firstName}
          name="firstName"
          onChange={changeHandler}
          placeholder="first name"
        />
      </Box>
      <Box>
        <Input
          value={user.lastName}
          onChange={changeHandler}
          name="lastName"
          placeholder="last name"
        />
      </Box>
      <Box>
        <Textarea
          value={user.description}
          onChange={changeHandler}
          name="description"
          placeholder="description"
        />
      </Box>
      <Divider />
      <HStack>
        <Button colorScheme="blue" onClick={saveBtnHandler}>
          save
        </Button>
        <Button colorScheme="red" onClick={() => navigate("/")}>
          no, thanks
        </Button>
      </HStack>
    </VStack>
  );
}

export default EditProfile;
