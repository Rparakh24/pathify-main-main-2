import React, { useState } from "react";

function Input(props) {
  

  var [item, setItem] = useState("");
  function handleItem(event) {
    setItem(event.target.value);
  }
  return (
    <div className="styles.form">
      <input onChange={handleItem} type="styles.text" value={item} />
      <button
        onClick={() => {
          props.OnAdd(item);
          setItem("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}
export default Input;

