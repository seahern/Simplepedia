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
    if (arguments.length === 0) {
      router.back();
    } else {
      const collection2 = [...collection];

      const newObject = {
        title: "",
        contents: "",
        edited: "",
        id: 0,
      };

      const finalMax = collection2.reduce(maxValue, 0);
      newObject.id = finalMax + 1;
      newObject.title = object.title;
      newObject.contents = object.contents;
      newObject.edited = new Date(Date.now()).toISOString();
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
