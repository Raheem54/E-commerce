import { createContext, useState } from "react";
export let tokencontext=createContext()
export default function TokenContextProvider(props) {
    const [tocken,settocken]=useState(null)
    return <tokencontext.Provider value={{tocken,settocken}}>
        {props.children}
    </tokencontext.Provider>
}