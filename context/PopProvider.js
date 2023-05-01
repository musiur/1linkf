import { createContext, useState } from "react";

export const PopContext = createContext({});


const PopProvider = ({ children }) => {
    const [message, setMessage] = useState(false);
    return (
        <PopContext.Provider value={{ message, setMessage }}>
            {children}
        </PopContext.Provider>
    )
}

export default PopProvider;