/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    articles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from "@mui/material/styles";
import ArticleShape from "./ArticleShape";

const NoBulletList = styled("ul")(() => ({
  listStyle: "none",
  paddingLeft: 0,
}));

export default function TitlesView({ articles, setCurrentArticle }) {
  const collectionSorted = [...articles].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const titleItems = collectionSorted.map((article) => (
    <li
      key={article.id}
      data-testid="title"
      onClick={() => {
        setCurrentArticle(article);
      }}
    >
      {article.title}
    </li>
  ));

  return (
    <div>
      {" "}
      <NoBulletList>{titleItems}</NoBulletList>
    </div>
  );
}

TitlesView.propTypes = {
  articles: PropTypes.arrayOf(ArticleShape),
  setCurrentArticle: PropTypes.func,
};
