import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import EmailInput from "../ui/emailInput/EmailInput.jsx";
import PasswordInput from "../ui/passwordInput/PasswordInput.jsx";
import NameInput from "../ui/nameInput/NameInput.jsx";
import ErrorAlert from "../ui/errorAlert/ErrorAlert.jsx";

import useHttp from "../../hooks/useHttp.js";
import useInput from "../../hooks/useInput.js";

function CreateAccount() {
  const { request, error, clearError } = useHttp();

  const { isOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

  const [email, setEmail] = useState("");

  const firstName = useInput();
  const lastName = useInput();
  const description = useInput();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function onCreateAccountBtnHandler() {
    try {
      await request("/api/user", "POST", {
        email,
        username,
        password,
        firstName: firstName.value,
        lastName: lastName.value,
        description: description.value,
      });
    } catch (e) {
    } finally {
      openAlert();
    }
  }

  return (
    <>
      <VStack align="stretch">
        <Box alignSelf="center">
          <Heading size="lg" m={2}>
            create account
          </Heading>
        </Box>
        <Box>
          <EmailInput value={email} setValue={setEmail} />
        </Box>
        <Box width="100%">
          <NameInput
            value={username}
            setValue={setUsername}
            placeholder="username"
          />
        </Box>
        <HStack>
          <Box>
            <Input {...firstName} placeholder="first name" />
          </Box>
          <Box>
            <Input {...lastName} placeholder="last name" />
          </Box>
        </HStack>
        <Box width="100%">
          <Input {...description} placeholder="description" />
        </Box>
        <Box>
          <PasswordInput value={password} setValue={setPassword} />
        </Box>
        <Box>
          <Button onClick={onCreateAccountBtnHandler} colorScheme="blue">
            create account
          </Button>
        </Box>
      </VStack>

      <ErrorAlert
        messageOnSuccess="letter sent to mail"
        isOpen={isOpen}
        close={closeAlert}
        clearError={clearError}
        error={error}
        cancelRef={cancelRef}
      />
    </>
  );
}

export default CreateAccount;
