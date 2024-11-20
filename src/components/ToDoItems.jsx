import React, { useState } from "react";

function TodoItem(props) {
  return <li onClick={() => props.onchecked(props.id)}>{props.text}</li>;
}

export default TodoItem;
