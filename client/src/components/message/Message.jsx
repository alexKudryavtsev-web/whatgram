import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

import defaultAvatar from "../../static/defaultAvatar.jpg";
import formatDate from "../../utils/formatDate.js";

function Message({ message }) {
  return (
    <HStack>
      <Box>
        <Avatar src={defaultAvatar} />
      </Box>
      <Box>
        <Text fontSize="xs">{formatDate(message.createdAt)}</Text>
        <Text borderColor="gray.200" p={2} borderWidth={1} borderRadius={12}>
          {message.text}
        </Text>
      </Box>
    </HStack>
  );
}

export default Message;
