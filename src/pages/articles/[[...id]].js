import PropTypes from "prop-types";
import { useRouter } from "next/router";
import IndexBar from "../../components/IndexBar";
import ArticleShape from "../../components/ArticleShape";
import Article from "../../components/Article";
import ButtonBar from "../../components/ButtonBar";

export default function Simplepedia({
  collection,
  setCurrentArticle,
  currentArticle,
}) {
  const router = useRouter();

  function handleClick1(event) {
    if (event === "add") {
      router.push("/edit");
    }
    if (event === "edit") {
      router.push(`/articles/${currentArticle.id}/edit`);
    }
  }

  const handleClick = handleClick1;

  return (
    <div>
      <IndexBar
        collection={collection}
        setCurrentArticle={setCurrentArticle}
        currentArticle={currentArticle}
      />

      {currentArticle && <Article currentArticle={currentArticle} />}

      <ButtonBar
        handleClick={handleClick}
        allowEdit={currentArticle !== undefined || null}
      />
    </div>
  );
}

Simplepedia.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape).isRequired,
  setCurrentArticle: PropTypes.func,
  currentArticle: ArticleShape,
  id: PropTypes.arrayOf(String),
};
