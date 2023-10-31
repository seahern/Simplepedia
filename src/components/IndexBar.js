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

  const sections2 = [
    ...new Set(collection.map((article) => article.title.charAt(0))),
  ];

  const filteredArticles = collection.filter((article) => {
    if (article.title.charAt(0) === currentSection) {
      return true;
    }
    return false;
  });

  function setCurrentSectionCaller(section) {
    setCurrentArticle();
    setCurrentSection(section);
  }

  useEffect(() => {
    if (currentArticle) {
      setCurrentSection(currentArticle.title.charAt(0).toUpperCase());
    }
  }, [currentArticle]);

  return (
    <div>
      <SectionsView
        sections={sections2}
        setCurrentSection={(section) => setCurrentSectionCaller(section)}
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
