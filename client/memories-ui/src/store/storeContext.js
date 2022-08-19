import React, {createContext, useContext, useReducer} from "react";

import rootReducer, { rootInitialState } from "./reducers/rootReducer";

export const DataContext = createContext();

export const DataProvider = (props) => {

    const value = useReducer(rootReducer, rootInitialState)



    // const combinedDispatch = React.useCallback(() => ({ dispatch }), [dispatch]);
    //  const combinedState = React.useMemo(() => ({ state }), [state]);

    
    return <DataContext.Provider value={value}  > {props.children} </DataContext.Provider> ;

};

export const useDataStore = () => useContext(DataContext);