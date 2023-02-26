import { createContext, useState } from "react";

export const UserContext = createContext({});


const UserProvider = ({children}) => {
    const [userdata, setUserdata] = useState({});
    return (
        <UserContext.Provider values={[userdata, setUserdata]}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;