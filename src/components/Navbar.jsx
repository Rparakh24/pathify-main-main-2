import React from "react";
import pathify from "../images/Pathify.png"
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar">
                <ul className="nav-box">
                    <Link  className="link" to="/page1"><li>Home</li></Link>
                    <Link  className="link" to="/page2"><li>Roadmap</li></Link>
                    <Link  className="link" to="/note"><li>Note</li></Link>
                    <Link  className="link" to="/todo"><li>ToDo</li></Link>
                    <Link  className="link" to="/resume"><li>Resume</li></Link>
                </ul>
                <div className="logo">
                    <img src ={pathify}></img>
                    <p>PATHIFY</p>
                </div>
                <div className="contact-box">
                <Link to="" className="font link"><li>SignIn</li></Link>
                </div>
            </div>
    )
}

export default Navbar;