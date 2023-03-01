import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


const UserProvider = ({ children }) => {
    const [userdata, setUserdata] = useState({});

    useEffect(() => {
        const data = sessionStorage.getItem("user_info");
        if(data){
            setUserdata(JSON.parse(data))
        }
    }, [])
    return (
        <UserContext.Provider value={{ userdata, setUserdata }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;