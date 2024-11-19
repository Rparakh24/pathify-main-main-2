import React from "react";
import pathify from "../images/Pathify.png"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar">
                <ul className="nav-box">
                    <li>Profile</li>
                    <li>Dashboard</li>
                    <li>Timeline</li>
                </ul>
                <div className="logo">
                    <img src ={pathify}></img>
                    <p>PATHIFY</p>
                </div>
                <div className="contact-box">
                    <p className="font">Sign In</p>
                </div>
            </div>
    )
}

export default Navbar;