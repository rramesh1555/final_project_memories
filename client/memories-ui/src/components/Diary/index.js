import React, { useState } from "react";
import "./ui.css"

const Diary = ( { contentUpdated } ) => {

    //const [content, setContent ] = useState("custom");

    const handleContentChange = (e) => {
     
        contentUpdated(e.target.innerHTML);
      //  setContent(e.target.innerHTML);
    }

    return (
        <>
                <div className="diaryContainer">
                <span className="before"></span>
                    <div className="diaryWrapper">
                       
                     <div  id="diary" contentEditable onBlur={handleContentChange}>
                         
                     </div>

                </div>
                </div>

                <br /><br />
        </>
    )
};



export default Diary;