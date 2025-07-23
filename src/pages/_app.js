import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
// import { Provider } from "@/components/ui/provider";
import { ChakraProvider, LocaleProvider } from "@chakra-ui/react";
import { system } from "@/lib/theme";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider value={system}>
        <LocaleProvider locale={"de-DE"}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
          <Analytics />
        </LocaleProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}
