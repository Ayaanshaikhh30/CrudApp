import React, { createContext, useState } from "react";

export const adddata = createContext("");
export const updatadata = createContext(""); // ✅ Spelling fixed to match Home.jsx

const Contextprovider = ({ children }) => {
    const [udata, setudata] = useState("");
    const [updata, setUPdata] = useState(""); // ✅ Variable name changed to `updata`

    return (
        <adddata.Provider value={{ udata, setudata }}>
            <updatadata.Provider value={{ updata, setUPdata }}> 
                {children}
            </updatadata.Provider>
        </adddata.Provider>
    );
};

export default Contextprovider;
