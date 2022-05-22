import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

import WithIndent from "../components/ui/withIndent/WithIndent.jsx";

function AboutPage() {
  return (
    <WithIndent>
      <VStack align="flex-start" paddingTop={5}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            "Whatgram" is free messenger, analogue of WhatsApp!
          </Text>
        </Box>
        <Box>
          <Text>
            Use it for anything, because it has a minimalistic user-friendly
            interface and reliability
          </Text>
        </Box>
        <Box>
          <Text>
            <Link
              color="blue.300"
              href="https://github.com/alexKudryavtsev-web"
              target="_blank"
            >
              author's github
            </Link>
          </Text>
        </Box>

        <Box>
          <Text>
            <Link
              color="blue.300"
              href="https://github.com/alexKudryavtsev-web/whatgram"
              target="_blank"
            >
              source code
            </Link>
          </Text>
        </Box>
      </VStack>
    </WithIndent>
  );
}

export default AboutPage;
