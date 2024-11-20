import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Notes from "./pages/Createnote";
import Todo from "./pages/Todo";
import ScreenResume from "./pages/ScreenResume";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/note" element={<Notes />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/resume" element={<ScreenResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
