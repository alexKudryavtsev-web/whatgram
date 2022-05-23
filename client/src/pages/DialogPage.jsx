import { VStack } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WithIndent from "../components/ui/withIndent/WithIndent.jsx";

import Loader from "../components/ui/loader/Loader.jsx";
import useHttp from "../hooks/useHttp.js";
import AuthContext from "../contexts/AuthContext.js";
import Message from "../components/message/Message.jsx";
import MyMessage from "../components/myMessage/MyMessage.jsx";
import SendMessage from "../components/sendMessage/SendMessage.jsx";

import { io } from "socket.io-client";

function DialogPage() {
  const { request, isLoading } = useHttp();
  const { dialogId } = useParams();
  const [messages, setMessages] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.emit("identity", auth.user.userId, dialogId);

    socket.on("new", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const fetchMessages = useCallback(async () => {
    const response = await request(
      `/api/conversation/${dialogId}`,
      "GET",
      null,
      auth.calculateHeader(),
      auth
    );

    setMessages(response);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <WithIndent>
        <VStack justifyContent="flex-end" alignItems="flex-start">
          {messages.map((message) =>
            message.senderId === auth.user.userId ? (
              <MyMessage message={message} key={message.messageId} />
            ) : (
              <Message message={message} key={message.messageId} />
            )
          )}
        </VStack>
        <SendMessage dialogId={dialogId} />
      </WithIndent>
    </>
  );
}

export default DialogPage;
