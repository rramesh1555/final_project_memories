import React, { Component }  from 'react';
import {  Switch, Route } from 'react-router-dom';
import CreateEntry from './components/Landing/CreateEntry';
import Landing from './components/Landing/index';
import Logout from './components/Login/Logout';
import Profile from './components/profile/index';
import Register from './components/Register/index';
import Login from './components/Login/index';



function Routers() {
    return (
      <>
            <section id="content">
             
           
             <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/createEntry" component={CreateEntry} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
             </Switch>
            
            
            </section>

      </>
    );
  }
  
  export default Routers;
  