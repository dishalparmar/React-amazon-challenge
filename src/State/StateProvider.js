import React, { createContext, useContext, useReducer } from "react";

// Creats the data layer
export const StateContext = createContext();                 

// This wraps our app and provide the data layer to all components
export const StateProvider = ({reducer, initialState, children}) => (
    
<StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
</StateContext.Provider>
);

// Pulls the info from the data layer. 
// "useStateValue" will be used on the components e.g product.js, to dispatch action.item to the reducer
export const useStateValue = () => useContext(StateContext);