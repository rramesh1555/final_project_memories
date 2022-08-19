import React from "react";
import "./ui.css";

const ImgDisplay = ( {images, deleteImage } ) => {


    return (
        <>
                <ul className="imgPreview">
                    { images && images.map ((img, index) => (
                        <li>
                            <img src={img.url} />
                            <span onClick={() => deleteImage(index)} className="close">X</span>
                        </li>
                    ))}
                </ul>
        </>
    )
};



export default ImgDisplay;