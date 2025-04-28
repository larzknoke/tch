import "@/styles/globals.css";
// import { Provider } from "@/components/ui/provider";
import { ChakraProvider, LocaleProvider } from "@chakra-ui/react";
import { system } from "@/lib/theme";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider value={system}>
      <LocaleProvider locale={"de-DE"}>
        {getLayout(<Component {...pageProps} />)}
      </LocaleProvider>
    </ChakraProvider>
  );
}
