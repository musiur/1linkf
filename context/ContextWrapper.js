
import UserProvider from "./UserProvider";

const ContextWrapper = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}

export default ContextWrapper