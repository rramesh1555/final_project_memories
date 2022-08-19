import loginReducer, { loginInitialState } from "./loginReducer";
import memoriesReducer, { memoriesInitialState } from "./memoriesReducer";
import combineReducers from "./combineReducers";
import notificationReducer, { notificationInitialState } from "./notificationReducer";

export const rootInitialState = {
   loginReducer: loginInitialState,
   memoriesReducer : memoriesInitialState,
   notificationReducer: notificationInitialState
}


const rootReducer =  combineReducers({ loginReducer, memoriesReducer, notificationReducer});

export default rootReducer;