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

  function complete(object) {
    if (object === undefined) {
      router.back();
    } else {
      const objectCheck = collection.find(
        (article) => article.id === object.id,
      );

      if (objectCheck) {
        const collection2 = collection.map((oldArticle) =>
          oldArticle.id === object.id ? object : oldArticle,
        );

        const newObject = { ...object };
        setCurrentArticle(newObject);
        setCollection(collection2);
      }
    }
  }

  const complete2 = complete;

  return (
    <div>
      <Editor
        setCurrentArticle={setCurrentArticle}
        complete={complete2}
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
