import React from "react";
import { Box } from "@chakra-ui/react";

function WithIndent({ children }) {
  return (
    <Box maxWidth="800px" paddingTop={1} margin="auto">
      {children}
    </Box>
  );
}

export default WithIndent;
