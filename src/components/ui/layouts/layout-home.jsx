import HeaderHome from "../../header-home";
import Footer from "../../footer";
import { Roboto_Condensed } from "next/font/google";
import Head from "next/head";

export const metadata = {
  title: {
    template: "%s | Tennis Club Holzminden von 1928 e.V",
    default: "Tennis Club Holzminden von 1928 e.V",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
};

// If loading a variable font, you don't need to specify the font weight
const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function LayoutHome({ children }) {
  return (
    <>
      <Head>
        <title>Tennis Club Holzminden von 1928 e.V</title>
        <meta
          name="description"
          content="Die Homepage des Tennis Club Holzminden von 1928 e.V"
        />
      </Head>
      <HeaderHome />
      <main
        className={`container mx-auto md:mt-10 md:mb-16 ${roboto_cond.className} `}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
