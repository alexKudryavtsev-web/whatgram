import { io } from "socket.io-client";
import { ChakraProvider, Heading } from "@chakra-ui/react";

function App() {
  const socket = io("http://localhost:5000");
  console.log(socket);

  return (
    <ChakraProvider>
      <Heading>Hello World</Heading>
    </ChakraProvider>
  );
}

export default App;
