import "@/styles/globals.css";
import { Provider } from "@/components/ui/provider";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ChakraProvider value={defaultSystem}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
