import PropTypes from "prop-types";
import ArticleShape from "../../../components/ArticleShape";
import Editor from "../../../components/Editor";

export default function SimplepediaEditor({
  collection,
  setCollection,
  setCurrentArticle,
  currentArticle,
}) {
  function complete(object) {
    if (arguments.length === 0) {
      setCurrentArticle();
    } else {
      const objectCheck = collection.find(
        (article) => article.id === object.id,
      );

      if (objectCheck) {
        const collection2 = [...collection];

        const indexObject = collection2.findIndex(
          (article) => article.id === object.id,
        );
        if (indexObject !== -1) {
          collection2[indexObject] = object;
        }

        const newObject = {
          title: "",
          contents: "",
          edited: "",
          id: 0,
        };

        newObject.id = object.id;
        newObject.title = object.title;
        newObject.contents = object.contents;
        newObject.edited = new Date(Date.now()).toISOString();
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
  id: PropTypes.arrayOf(String),
};
