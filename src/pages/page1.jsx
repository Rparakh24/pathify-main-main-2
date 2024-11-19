import React from "react";
import Navbar from "../components/Navbar";
import Problem from "../components/Problem";
function page1() {
  return (
    <div className="app-container">
      <Navbar />
      <Problem />
      {/* <Explain/> */}
    </div>
  );
}

export default page1;
