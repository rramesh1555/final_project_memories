import React from "react";
import { Link } from "react-router-dom";

import "./memoryMenu.css";
import { pages } from "../../../constants/pages";

const MemoryMenu = ( { page} ) => { 
    return (
        <>
            <ul className="memoryMenu">
            <li className={ page === pages.CREATE_ENTRY ? "active" : ""}>
                    <Link to="/createEntry">Create Entry</Link>
                </li>
                <li className={ page === pages.MY_FEEDS ? "active" : ""}>
                    <Link to={{ pathname : "/", state :  { publicFeeds: false} }} >My Feeds</Link>
                </li>
                <li className={ page === pages.PUBLIC_FEEDS ? "active" : ""}>
                    <Link to={{ pathname : "/", state :  { publicFeeds: true} }}>Public Feeds</Link>
                </li>
                <li className={ page === pages.MY_CIRCLE ? "active" : ""}>
                    <Link to="/createEntry">My circle</Link>
                </li>
                
            </ul>
        </>
    )
};



export default MemoryMenu;