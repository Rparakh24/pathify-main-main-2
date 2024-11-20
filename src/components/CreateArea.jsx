import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {
  const [condition, handlecondition] = useState(false);
  function onTitleClick() {
    handlecondition(true);
  }

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {condition && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          onClick={onTitleClick}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={condition ? 3 : 1}
        />

        <Zoom in={condition}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
