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
// eslint-disable-next-line import/no-extraneous-dependencies
import TextField from "@mui/material/TextField";
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from "@mui/material/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import ButtonGroup from "@mui/material/ButtonGroup";
// eslint-disable-next-line import/no-extraneous-dependencies
import Stack from "@mui/material/Stack";
import ArticleShape from "./ArticleShape";

export default function Editor({ currentArticle, complete }) {
  const [newTitle, setNewTitle] = useState(
    currentArticle ? currentArticle.title : "",
  );
  const [newContents, setNewContents] = useState(
    currentArticle ? currentArticle.contents : "",
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
      <TextField
        required
        fullWidth
        margin="normal"
        id="title"
        label="Title"
        onChange={(text) => setNewTitle(text.target.value)}
        value={newTitle}
        error={!newTitle}
        helperText={!newTitle ? "Title can't be blank" : " "}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        margin="normal"
        id="contents"
        label="Contents"
        onChange={(text) => setNewContents(text.target.value)}
        value={newContents}
      />
      <Stack spacing={2} direction="row">
        <ButtonGroup variant="contained" sx={{ my: 2 }}>
          <Button disabled={newTitle === ""} onClick={() => save()}>
            Save
          </Button>
          <Button onClick={() => cancel()}>Cancel</Button>
        </ButtonGroup>
      </Stack>
    </div>
  );
}

Editor.propTypes = {
  complete: PropTypes.func.isRequired,
  currentArticle: ArticleShape,
};
