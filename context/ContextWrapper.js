
import EditorProvider from "./EditorProvider";
import UserProvider from "./UserProvider";

const ContextWrapper = ({ children }) => {
    return (
        <UserProvider>
            <EditorProvider>
                {children}
            </EditorProvider>
        </UserProvider>
    )
}

export default ContextWrapper