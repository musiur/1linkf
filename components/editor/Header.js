import UploadImage from "components/UploadImage";
import { EditorContext } from "context/EditorProvider";
import { useContext, useState } from "react";

const Header = () => {
    const { editordata, setEditordata } = useContext(EditorContext);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setEditordata({ ...editordata, ["headers"]: { ...editordata.headers, [name]: value } });
    }

    return (
        <div className="pt-5 grid grid-cols-1 gap-5" id="editor_header_form">
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="url">Your 1link page URL</label>
                <input type="text" name="url" placeholder="URL" id="url" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={editordata.headers?.url} />
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="profilePicture">Your profile picture</label>
                <UploadImage type="profile" func={handleOnChange} name="profilePicture" label="Upload your profile picture" defaultValue={editordata.headers?.profilePicture} />
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="bannerPicture">Your banner picture <span className="px-3 py-[4px] rounded-full text-[0.8rem] bg-[#DB2777] text-white">Premium</span></label>
                <UploadImage func={handleOnChange} name="bannerPicture" label="Upload your banner picture" defaultValue={editordata.headers?.bannerPicture} />
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="name">Your name</label>
                <input type="text" name="name" placeholder="Name" id="name" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={editordata.headers?.name} />
            </div>

            <div className="grid grid-cols-1 gap-1">
                <label htmlFor="outline">Outline</label>
                <input type="text" name="outline" placeholder="Outline" id="outline" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={editordata.headers?.outline} />
            </div>

            <div className="flex items-center justify-start gap-1">
                <input type="checkbox" name="hide1link" placeholder="hide1link" id="hide1link" className="border rounded-md px-3 py-1 mt-[13px]" onChange={() => {
                    handleOnChange({
                        target: {
                            name: "hide1link",
                            value: document.getElementById("hide1link").checked ? true : false
                        }
                    });

                }} defaultChecked={editordata.headers?.hide1link} />

                <label htmlFor="hide1link">Hide 1link icon in footer <span className="px-3 py-[4px] rounded-full text-[0.8rem] bg-[#DB2777] text-white">Premium</span></label>
            </div>
        </div>
    )
}

export default Header;