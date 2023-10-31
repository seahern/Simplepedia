import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ArticleShape from "../../../components/ArticleShape";
import Editor from "../../../components/Editor";

export default function SimplepediaEditor({
  collection,
  setCollection,
  setCurrentArticle,
  currentArticle,
}) {
  const router = useRouter();

  function complete(article) {
    if (!article) {
      router.back();
    } else {
      const articleCheck = collection.find(
        (comparedArticle) => comparedArticle.id === article.id,
      );

      if (articleCheck) {
        const collection2 = collection.map((oldArticle) =>
          oldArticle.id === article.id ? article : oldArticle,
        );

        const newArticle = { ...article };
        setCurrentArticle(newArticle);
        setCollection(collection2);
      }
    }
  }

  return (
    <div>
      <Editor
        setCurrentArticle={setCurrentArticle}
        complete={(article) => complete(article)}
        currentArticle={currentArticle}
        key={currentArticle?.id}
      />
    </div>
  );
}

SimplepediaEditor.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape),
  setCollection: PropTypes.func,
  setCurrentArticle: PropTypes.func,
  currentArticle: ArticleShape,
};
