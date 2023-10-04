import PropTypes from "prop-types";
import ArticleShape from "../components/ArticleShape";
import Editor from "../components/Editor";

export default function SimplepediaCreator({
  collection,
  setCollection,
  setCurrentArticle,
}) {
  function maxValue(maxValueParameter, currentObject) {
    let foundMax = maxValueParameter;
    if (maxValueParameter < currentObject.id) {
      foundMax = currentObject.id;
    }
    return foundMax;
  }

  function complete(object) {
    const objectCheck = collection.find(
      (article) => article.title === object.title,
    );

    if (objectCheck) {
      const collection2 = [...collection];

      const indexObject = collection2.findIndex(
        (article) => article.title === object.title,
      );
      if (indexObject !== -1) {
        collection2.splice(indexObject, object);
      }

      const newObject = object;

      const finalMax = collection2.reduce(maxValue);
      newObject.id = finalMax + 1;
      collection2.push(newObject);
      setCollection(collection2);
      setCurrentArticle(newObject);
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
  setCurrentArticle: ArticleShape,
};
