import React  from "react";
import { Link } from "react-router-dom";

import './App.css';

const Menu = () => {
   return (
        <>
            {/* <nav className = 'navbar navbar-dark bg-dark'> */}
            <nav className = "container lightGreen pullDown">
                
                {/* <section id="center"> */}

                <ul>
                    
                    <li>
                        <Link to="/">Landing</Link>  

                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>  

                    </li>

                    <li>
                        <Link to="/logout">Logout</Link>  

                    </li>
                 
                </ul>
{/* 
                </section> */}
            </nav>
        </>

    )
}

export default Menu;

