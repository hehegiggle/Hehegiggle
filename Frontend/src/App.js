import Routers from "./Pages/Router/Routers";
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  return (
    <div className="">
      <ChakraProvider>
        <Routers />
      </ChakraProvider>
    </div>
  );
}

export default App;
