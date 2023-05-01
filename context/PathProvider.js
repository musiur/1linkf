import { createContext, useState } from "react";

export const PathContext = createContext({});


const PathProvider = ({ children }) => {
    const [pathname, setPathname] = useState(null);
    return (
        <PathContext.Provider value={{ pathname, setPathname }}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider;