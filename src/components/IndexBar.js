/*
  IndexBar.js

  This component provides the section and title display that allows the user to 
  browse the available articles and select one for display. 

   props:
    collection - Array of articles in encyclopedia
    setCurrentArticle - Function to call set current article displayed
    currentArticle - The article to render
*/
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SectionsView from "./SectionsView";
import TitlesView from "./TitlesView";
import ArticleShape from "./ArticleShape";

export default function IndexBar({
  collection,
  setCurrentArticle,
  currentArticle,
}) {
  const [currentSection, setCurrentSection] = useState(null);

  let sections = [];

  sections = collection.map((object) => object.title.substring(0, 1));

  const sections2 = [...new Set(sections)];

  const filteredArticles = collection.filter((article) => {
    if (article.title.substring(0, 1) === currentSection) {
      return article;
    }
    return null;
  });

  function setCurrentSectionCaller(object) {
    setCurrentArticle(undefined);
    setCurrentSection(object);
  }

  const setCurrentSectionCaller2 = setCurrentSectionCaller;

  useEffect(() => {
    if (currentArticle) {
      setCurrentSection(currentArticle.title.charAt(0).toUpperCase());
    }
  }, [currentArticle]);

  return (
    <div>
      <SectionsView
        sections={sections2}
        setCurrentSection={setCurrentSectionCaller2}
      />
      <TitlesView
        articles={filteredArticles}
        setCurrentArticle={setCurrentArticle}
      />
    </div>
  );
}

IndexBar.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape),
  setCurrentArticle: PropTypes.func,
  currentArticle: ArticleShape,
};
