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
// eslint-disable-next-line import/no-extraneous-dependencies
import Grid from "@mui/material/Grid";
// eslint-disable-next-line import/no-extraneous-dependencies
import Box from "@mui/material/Box";
import SectionsView from "./SectionsView";
import TitlesView from "./TitlesView";
import ArticleShape from "./ArticleShape";

export default function IndexBar({
  collection,
  setCurrentArticle,
  currentArticle,
  children,
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SectionsView
            sections={sections2}
            setCurrentSection={(section) => setCurrentSectionCaller(section)}
            currentSection={currentSection}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TitlesView
          articles={filteredArticles}
          setCurrentArticle={setCurrentArticle}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={9}>
        {" "}
        {children}{" "}
      </Grid>
    </Grid>
  );
}

IndexBar.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape),
  setCurrentArticle: PropTypes.func,
  currentArticle: ArticleShape,
  children: PropTypes.node,
};
