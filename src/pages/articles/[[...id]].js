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

  function setCurrentArticle2(object) {
    if (arguments.length === 0) {
      router.back();
    } else {
      setCurrentArticle(object);
    }
  }

  const setCurrentArticle3 = setCurrentArticle2;

  function handleClick1(event) {
    if (event === "add") {
      router.push("/edit");
    }
    if (event === "edit") {
      const stringAddress = `/articles/${currentArticle.id}/edit`;
      router.push(stringAddress);
    }
  }

  const handleClick = handleClick1;

  return (
    <div>
      <IndexBar
        collection={collection}
        setCurrentArticle={setCurrentArticle3}
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
};
