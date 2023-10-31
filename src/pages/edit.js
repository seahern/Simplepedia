import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ArticleShape from "../components/ArticleShape";
import Editor from "../components/Editor";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  const router = useRouter();

  function maxValue(maxValueParameter, currentObject) {
    let foundMax = maxValueParameter;
    if (maxValueParameter < currentObject.id) {
      foundMax = currentObject.id;
    }
    return foundMax;
  }

  function complete(article) {
    if (!article) {
      router.back();
    } else {
      const collection2 = [...collection];

      const finalMax = collection2.reduce(maxValue, 0);
      const newArticle = { ...article, id: finalMax + 1 };
      collection2.push(newArticle);
      setCurrentArticle(newArticle);
      setCollection(collection2);
    }
  }

  return (
    <div>
      <Editor
        setCurrentArticle={setCurrentArticle}
        complete={(article) => complete(article)}
      />
    </div>
  );
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape),
  setCollection: PropTypes.func,
  setCurrentArticle: PropTypes.func,
};
