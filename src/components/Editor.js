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

export default function Editor({ currentArticle, complete }) {
  const [newTitle, setNewTitle] = useState(
    currentArticle ? currentArticle.title : undefined,
  );
  const [newContents, setNewContents] = useState(
    currentArticle ? currentArticle.contents : undefined,
  );

  async function save() {
    const newArticle = {
      ...currentArticle,
      title: newTitle,
      contents: newContents,
      edited: new Date(Date.now()).toISOString(),
    };
    complete(newArticle);
  }

  function cancel() {
    complete();
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title must be set"
        onChange={(event) => setNewTitle(event.target.value)}
        value={newTitle}
      />
      <textarea
        type="text"
        placeholder="Contents"
        onChange={(event) => setNewContents(event.target.value)}
        value={newContents}
      />
      <button
        type="button"
        name="Save"
        disabled={newTitle === undefined || newTitle === ""}
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
