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

  function complete(object) {
    if (object === undefined) {
      router.back();
    } else {
      const collection2 = [...collection];

      const finalMax = collection2.reduce(maxValue, 0);
      const newObject = { ...object, id: finalMax + 1 };
      collection2.push(newObject);
      setCurrentArticle(newObject);
      setCollection(collection2);
    }
  }

  const complete2 = complete;

  return (
    <div>
      <Editor setCurrentArticle={setCurrentArticle} complete={complete2} />
    </div>
  );
}

SimplepediaCreator.propTypes = {
  collection: PropTypes.arrayOf(ArticleShape),
  setCollection: PropTypes.func,
  setCurrentArticle: PropTypes.func,
};
