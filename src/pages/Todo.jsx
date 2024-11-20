import React, { useState } from "react";
import Input from "../components/input";
import TodoItem from "../components/ToDoItems";
import Navbar from "../components/Navbar";


function Todo() {
  var [list, setList] = useState([]);

  function addlist(item) {
    setList((x) => [...x, item]);
 
  }
  function deleteitem(id) {
    setList((prevslist) => {
      return prevslist.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    
    <div className="styles.container">
    <Navbar/>
      <div className="styles.heading">
        <h1>To-Do List</h1>
      </div>

      <Input OnAdd={addlist} />
      <div>
        <ul>
          {list.map((todoitem, index) => (
            <TodoItem
              key={index}
              id={index}
              text={todoitem}
              onchecked={deleteitem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
