import Sidebar from "@/components/sidebar";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "next/router";
import HeaderText from "@/components/ui/header-text";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { newsData } from "@/lib/newsData";
import { dateFormatter } from "@/lib/utils";

export default function NewsPage({ newsItem }) {
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
          <Image
            src={`/news/${newsItem.image}`}
            alt={newsItem.title}
            width="1000"
            height="645"
            className="w-full rounded-sm hover:cursor-pointer border-b-4 border-tch-blue mb-4"
          />
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
