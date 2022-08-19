import './App.css';
import AppInit from './AppInit';
import {  DataProvider } from './store/storeContext';
import React from 'react';


function App() {
  return (
        <DataProvider >
        <AppInit /> 
       </DataProvider>
  );
}

export default App;
