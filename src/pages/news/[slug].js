import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";
import HeaderText from "@/components/ui/header-text";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { newsData } from "@/lib/newsData";
import { dateFormatter } from "@/lib/utils";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

export default function NewsPage({ newsItem }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state) => () => setOpen(state);

  const updateIndex =
    (when) =>
    ({ index: current }) => {
      if (when === open) {
        setIndex(current);
      }
    };

  return (
    <div className="flex flex-col gap-16 p-5 md:p-0">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="w-full md:w-2/3">
          <div>
            <Text className="text-gray-500 mb-1">
              {dateFormatter(newsItem.date, false)}
            </Text>
            <HeaderText text={newsItem.title} />
          </div>
          {(newsItem.images || []).length > 1 ? (
            <Lightbox
              className="news-lightbox"
              index={index}
              slides={newsItem.images}
              plugins={[Inline, Slideshow]}
              slideshow={{ autoplay: 3000, delay: 3000 }}
              on={{
                view: updateIndex(false),
                click: toggleOpen(true),
              }}
              carousel={{
                padding: 0,
                spacing: 0,
                imageFit: "cover",
              }}
              inline={{
                style: {
                  width: "100%",
                  maxWidth: "900px",
                  aspectRatio: newsItem.portrait ? "1000/1000" : "1000 / 645",
                  margin: "0 auto",
                },
              }}
            />
          ) : (
            <Image
              src={`/news/${newsItem.image}`}
              alt={newsItem.title}
              width="1000"
              height="645"
              className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue mb-4"
            />
          )}
          <div
            className="flex flex-col gap-4 mt-8"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />
        </div>
        <div className="w-full md:w-1/3 gap-12 flex flex-col">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

NewsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const paths = newsData.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false, // `false` = 404 für unbekannte Slugs
  };
}

export async function getStaticProps({ params }) {
  const newsItem = newsData.find((item) => item.slug === params.slug);

  return {
    props: {
      newsItem,
    },
  };
}
