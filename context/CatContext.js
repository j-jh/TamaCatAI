// CatContext.js
// Stores global state information about cat!

/*
    rough attributes description:
    name √
    hunger: √ from purchased food
    money: increase with probelm solved
    affection: √ 
    cleanliness: maybe 
    energy: √ for solving problems
    exp: √ gained with solved problems
*/
"use client";
import { useState, useContext, createContext } from "react"

// Cat context object 
const CatContext = createContext(null);

// Context provider to allow global access from other components to cat state
export function CatProvider( {children} ) {
    const [cat, setCat] = useState( {
        name: "",
        hunger: 0,
        money: 0,
        affection: 0,
        energy: 0,
        exp: 0
    })
    return  (
        <CatContext.Provider value= {{cat, setCat}}>
            {children}
        </CatContext.Provider>
    );
}
// Allows cat state to be accessed with useCat(). Returns cat state, setCat func.
export function useCat() {
    return useContext(CatContext);
}