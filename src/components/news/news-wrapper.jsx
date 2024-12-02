import React from "react";
import NewsItem from "./news-item";
import HeaderText from "../ui/header-text";

function NewsWrapper() {
  return (
    <div className="px-5 py-5 md:py-0 md:px-0">
      <HeaderText text="NEWS & NEUIGKEITEN" />
      <div className="pt-3">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  );
}

export default NewsWrapper;
