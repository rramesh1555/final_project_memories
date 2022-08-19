import React, { useEffect, useState } from "react";
import { useDataStore } from "./store/storeContext";
import Login from './components/Login';
import Register from "./components/Register";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Routers from './Routers'
import Menu  from "./Menu";
import SnackBar from "./components/common/snackbar";

const AppInit = () => {
    const [ state ] = useDataStore();
    const [ showSnackBar, setShowSnackBar] = useState(false);

    const { loginReducer, notificationReducer } = state;

    const { item } = notificationReducer;



    return (
            <><SnackBar item={item} />  
                { loginReducer && loginReducer.accessToken ? 
                    <>
                        <BrowserRouter>
                        <p className="welcomeMsg">Hi welcome  <strong>{loginReducer.name}</strong> {loginReducer.avatar && <img src={loginReducer.avatar} />}</p>
                        
                        
                        <Menu></Menu>
                        <section id="center" className="main">
                            <Routers></Routers>
                        </section>
                        </BrowserRouter>
                    </> : 
                      <Login/>
     
                  }
            </>
        )
};



export default AppInit;

