import React, { useEffect, useRef, useState } from "react";

import "./snackbar.css";

const SnackBar = ( {item} ) => { 

    const bars = useRef([]);


    const [ barList, setBarList ] = useState([]);

    
    const removeBarItem = (idToRemove) => {
        const getItemtoRemove = bars.current.findIndex( item => parseInt(item.id) === parseInt(idToRemove));

        let removedList = [...bars.current];
        removedList.splice(getItemtoRemove , 1);
        bars.current = [...removedList];
        console.log("removing " , getItemtoRemove , bars.current);
        setBarList([...bars.current]);
    }

    const removeItem = ( idToRemove) => {
        console.log("removing ", idToRemove)
        
    };
    
    useEffect(() => {
        if(item) {
            let newBars = [...bars.current];
            newBars.push(item)
            bars.current = newBars;
            setBarList([...bars.current]);
    

            setTimeout(()=> {
                removeBarItem(item.id)
            }, 3000);
        }
       

        
    }, [item]);


     return (
        <>
        <div className="snackbarWrap">
           

                    { barList && barList.map( (barItm, index) =>  (
                       <div key={index} onClick={() => removeBarItem(item.id)} className={`snackbarItm ${barItm.type}`}> 
                            <p>{barItm.title}</p>
                       </div>
                ))}
        </div>
        </>
    )
};



export default SnackBar;