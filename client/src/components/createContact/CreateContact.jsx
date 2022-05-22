import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineUserAdd } from "react-icons/ai";

import useInput from "../../hooks/useInput.js";
import useHttp from "../../hooks/useHttp.js";
import Loader from "../ui/loader/Loader.jsx";
import AuthContext from "../../contexts/AuthContext.js";
import defaultAvatar from "../../static/defaultAvatar.jpg";
import useUsers from "../../hooks/useUsers.js";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

function CreateContact() {
  const { request, error, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const username = useInput();

  const searchedUsers = useUsers(users, username.value);

  const fetchUsers = useCallback(async () => {
    const response = await request("/api/user", "GET");
    setUsers(response);
  }, [request, setUsers]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function createContact(userId) {
    try {
      await request(
        "/api/contact",
        "POST",
        { userId },
        auth.calculateHeader(),
        auth
      );
    } catch (error) {
    } finally {
      onOpen();
    }
  }

  if (!users) {
    return <Loader />;
  }

  return (
    <>
      <VStack padding={2} align="stretch">
        <Box>
          <Heading size="lg">Create contact:</Heading>
        </Box>
        <Box>
          <Input placeholder="any information" {...username} />
        </Box>
        {searchedUsers.length === 0 && (
          <Heading size="md">Contacts not found</Heading>
        )}
        {searchedUsers.map((user) => (
          <React.Fragment key={user.userId}>
            <HStack flexWrap="wrap">
              <Box>
                <Image boxSize={50} borderRadius="full" src={defaultAvatar} />
              </Box>
              <Box flex={1}>
                <Text fontWeight="bold" textAlign="start">
                  {user.username}
                </Text>
              </Box>
              <Box flex={1}>
                <Text textAlign="start">
                  {user.firstName} {user.lastName}
                </Text>
              </Box>
              <Box flex={2} textAlign="end">
                <Text>{user.description}</Text>
              </Box>
              <Box>
                <IconButton
                  icon={<AiOutlineUserAdd />}
                  variant="ghost"
                  onClick={() => createContact(user.userId)}
                />
              </Box>
            </HStack>
            <Divider />
          </React.Fragment>
        ))}
      </VStack>

      <ErrorAlert
        messageOnSuccess="contact is created"
        isOpen={isOpen}
        close={onClose}
        clearError={clearError}
        error={error}
        cancelRef={cancelRef}
      />
    </>
  );
}

export default CreateContact;
