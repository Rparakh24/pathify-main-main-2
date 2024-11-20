import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  const [ColorNo] = useState(Math.floor(Math.random() * 7));
  var colours = [
    "#FFB6C1",
    "#FFFFE0",
    "#98FB98",
    "#AFEEEE",
    "#E6E6FA",
    "#F08080",
    "#F5F5DC",
  ];
  return (
    <div className="note" style={{ backgroundColor: colours[ColorNo] }}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
