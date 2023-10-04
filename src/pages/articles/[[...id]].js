import PropTypes from "prop-types";
import IndexBar from "../../components/IndexBar";
import ArticleShape from "../../components/ArticleShape";
import Article from "../../components/Article";

export default function Simplepedia({
  collection,
  setCurrentArticle,
  currentArticle,
}) {
  function setCurrentArticle2(object) {
    setCurrentArticle(object);
  }

  const setCurrentArticle3 = setCurrentArticle2;

  return (
    <div>
      <IndexBar
        collection={collection}
        setCurrentArticle={setCurrentArticle3}
      />

      {!currentArticle ? null : <Article currentArticle={currentArticle} />}
      {currentArticle ? null : <p>Please select a section </p>}
    </div>
  );
}

Simplepedia.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func,
  currentArticle: ArticleShape,
};
