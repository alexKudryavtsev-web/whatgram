import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BiSend } from "react-icons/bi";
import AuthContext from "../../contexts/AuthContext.js";
import useHttp from "../../hooks/useHttp.js";
import WithIndent from "../ui/withIndent/WithIndent.jsx";

function SendMessage({ dialogId }) {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function sendMessage() {
    if (!message.trim()) {
      return;
    }

    await request(
      `/api/conversation/${dialogId}`,
      "POST",
      { text: message },
      auth.calculateHeader(),
      auth
    );

    setMessage("");
  }

  return (
    <WithIndent
      position="fixed"
      bottom={0}
      backgroundColor="white"
      width="100%"
      paddingBottom={3}
      paddingTop={3}
    >
      <InputGroup>
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="message text"
        />
        <InputRightElement>
          <IconButton icon={<BiSend />} variant="ghost" onClick={sendMessage} />
        </InputRightElement>
      </InputGroup>
    </WithIndent>
  );
}

export default SendMessage;
