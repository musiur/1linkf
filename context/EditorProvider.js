import { createContext, useEffect, useState } from "react";

export const EditorContext = createContext({});


const EditorProvider = ({ children }) => {
    const [editordata, setEditordata] = useState({
        headers: {},
        socialLinks: [],
        links: [],
        books: [],
        appearance: {}
    });

    return (
        <EditorContext.Provider value={{ editordata, setEditordata }}>
            {children}
        </EditorContext.Provider>
    )
}

export default EditorProvider;