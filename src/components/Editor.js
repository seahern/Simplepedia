/*
  Editor.js

  This provides a basic editor with space for entering a title and a body.

  The interface has two buttons. If "Cancel" is clicked, the `complete` callback
  is called with no arguments. If the "Save" button is clicked, the `complete` callback
  is called with a new article object with `title`, `contents`, and `date`. 

  If the optional `article` prop is set, the `title` and `contents` fields of the component
  are pre-loaded with the values. In addition, all other properties of the object are 
  included in the returned article object. 

  props:
    currentArticle - object with `title` and `contents` properties at minimum
    complete - function to call on completion (required)
*/
import PropTypes from "prop-types";
import ArticleShape from "./ArticleShape";
// import styles from "../styles/Editor.module.css";

// eslint-disable-next-line no-unused-vars
export default function Editor({ currentArticle, complete }) {
  const newObject = {
    title: "",
    contents: "",
    edited: "",
    id: 0,
  };

  function save() {
    newObject.edited = new Date(Date.now()).toISOString();
    complete(newObject);
  }

  function cancel() {
    complete(" ");
  }

  function setObjectTitle(objectTitle) {
    newObject.title = objectTitle;
  }

  function setObjectContents(objectContent) {
    newObject.content = objectContent;
  }

  return (
    <div>
      <input type="text" onChange={(event) => setObjectTitle(event)} />
      <textarea>
        <input onChange={(event) => setObjectContents(event)} />
      </textarea>
      <button
        type="button"
        onClick={() => {
          save();
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => {
          cancel();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

Editor.propTypes = {
  complete: PropTypes.func,
  currentArticle: ArticleShape,
};
