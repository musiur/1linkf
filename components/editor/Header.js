import { EditorContext } from "context/EditorProvider";
import { useContext, useState } from "react";

const Header = () => {
    const {editordata, setEditordata} = useContext(EditorContext);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setEditordata({...editordata, ["headers"]: {...editordata.headers, [name]: value}});
        console.log(editordata)
    }

    return (
        <div className="pt-5 grid grid-cols-1 gap-2">
            <input type="text" name="url" placeholder="URL" id="url" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={editordata.headers?.url} />
            <input type="text" name="name" placeholder="Name" id="name" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={editordata.headers?.name} />
            <input type="text" name="outline" placeholder="Outline" id="outline" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={editordata.headers?.outline} />
        </div>
    )
}

export default Header;