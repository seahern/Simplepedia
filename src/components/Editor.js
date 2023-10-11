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
import { useState } from "react";
import ArticleShape from "./ArticleShape";
// import styles from "../styles/Editor.module.css";

export default function Editor({ currentArticle, complete }) {
  const [newObject, setNewObject] = useState(
    currentArticle
      ? { ...currentArticle }
      : {
          title: "",
          contents: "",
          edited: "",
          id: 0,
        },
  );

  async function save() {
    if (currentArticle?.id) {
      newObject.edited = new Date(Date.now()).toISOString();
      complete(newObject);
    } else {
      newObject.edited = new Date(Date.now()).toISOString();
      complete(newObject);
    }
  }

  function cancel() {
    complete();
  }

  function setObjectTitle(event) {
    const newTitle = event.target.value;
    setNewObject({ ...newObject, title: newTitle });
  }

  function setObjectContents(event) {
    const newContents = event.target.value;
    setNewObject({ ...newObject, contents: newContents });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title must be set"
        onChange={(event) => setObjectTitle(event)}
        value={newObject.title}
      />
      <textarea
        type="text"
        placeholder="Contents"
        onChange={(event) => setObjectContents(event)}
        value={newObject.contents}
      />
      <button
        type="button"
        name="Save"
        disabled={newObject.title === ""}
        onClick={() => {
          save();
        }}
      >
        Save
      </button>
      <button
        type="button"
        name="Cancel"
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
  complete: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
