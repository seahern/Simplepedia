/*
  TitleList.js

  This module displays a list of titles and reports when a user clicks on one.

  props:
    articles - an array of objects with title and id properties
    setCurrentArticle - a callback that expects an article as an argument

*/
import PropTypes from "prop-types";
import ArticleShape from "./ArticleShape";

export default function TitlesView({ articles, setCurrentArticle }) {
  const collectionSorted = [...articles].sort((a, b) => {
    const upperCaseA = a.title.toUpperCase();
    const upperCaseB = b.title.toUpperCase();

    if (upperCaseA < upperCaseB) {
      return -1;
    }
    if (upperCaseA > upperCaseB) {
      return 1;
    }
    return 0;
  });

  const listWithKey = collectionSorted.map((object) => (
    <li
      key={object.id}
      data-testid="title"
      onClick={() => {
        setCurrentArticle(object);
      }}
    >
      {object.title}
    </li>
  ));

  return (
    <div>
      {" "}
      <ul> {listWithKey} </ul>{" "}
    </div>
  );
}

TitlesView.propTypes = {
  articles: ArticleShape,
  setCurrentArticle: PropTypes.func,
};
