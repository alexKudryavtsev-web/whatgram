import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

import defaultAvatar from "../../static/defaultAvatar.jpg";
import formatDate from "../../utils/formatDate.js";

function MyMessage({ message }) {
  return (
    <HStack alignSelf="flex-end">
      <Box>
        <Text fontSize="xs" textAlign="end">
          {formatDate(message.createdAt)}
        </Text>
        <Text
          backgroundColor="blue.100"
          p={2}
          borderWidth={1}
          borderRadius={12}
        >
          {message.text}
        </Text>
      </Box>
      <Box>
        <Avatar src={defaultAvatar} />
      </Box>
    </HStack>
  );
}

export default MyMessage;
