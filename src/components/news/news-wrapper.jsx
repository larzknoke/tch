import React from "react";
import NewsItem from "./news-item";
import HeaderText from "../ui/header-text";
import { newsData } from "@/lib/newsData";

function NewsWrapper({ limit = null }) {
  return (
    <div className="px-5 py-5 md:py-0 md:px-0">
      <HeaderText text="NEWS & NEUIGKEITEN" />
      <div className="pt-3 grid gap-8 grid-cols-1 md:grid-cols-2">
        {newsData
          .slice(0, limit || newsData.length)
          .sort((a, b) => b.id - a.id)
          .map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
      </div>
    </div>
  );
}

export default NewsWrapper;
