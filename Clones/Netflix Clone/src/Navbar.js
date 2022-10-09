import React from 'react'
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const [show, handleShow] = useState(false);
  
  // For pushing the history page for going forward and backward page
  const history = useHistory();

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => {
            window.removeEventListener("scroll", transitionNavbar);
        }
    }, []);

    return (
      <div className={`nav ${show && "nav-black"}`}>
        <div className="nav-contents">
          <img
            onClick={() => history.push("/")}
            className="nav-logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="Netflix Logo"
          />

          <img
            onClick={() => history.push("/profile")}
            className="nav-avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avtar"
          />
        </div>
      </div>
    );
}

export default Navbar
