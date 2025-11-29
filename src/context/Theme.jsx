import { createContext, useState } from "react";

import React from 'react'
export const themecontext = createContext()

function Theme(props) {
    const [theme,settheme] = useState('white')
    return <themecontext.Provider value={{theme,settheme}}>
        {props.children}
    </themecontext.Provider>
}

export default Theme