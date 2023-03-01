import UploadImage from "components/UploadImage";
import { EditorContext } from "context/EditorProvider";
import { useContext, useEffect, useState } from "react";
import BookCardButtons from "./BookCardButtons";

const BookCard = ({ props }) => {
    const { editordata, setEditordata } = useContext(EditorContext);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        let temp = { ...editordata };
        for (let i = 0; i < temp.books.length; i++) {
            if (temp.books[i].id === props.id) {
                temp.books[i] = { ...temp.books[i], [name]: value }
                break;
            }
        }
        setEditordata(temp);
    }
    
    return (
        <div className="m-4 p-3 rounded-md border">
            <h4 className="font-bold text-[#0891B2]">New Book</h4>
            <div className="pt-5 grid grid-cols-1 gap-5" id="editor_header_form">
                <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" id="title" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={props?.title} />
                </div>

                <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="outline">Outline</label>
                    <input type="text" name="outline" placeholder="Outline" id="outline" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={props?.outline} />
                </div>

                <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="bookcover">Your book cover</label>
                    <UploadImage func={handleOnChange} name="bookcover" label="Upload your book cover" defaultValue={props?.bookcover} />
                </div>

                <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="pagecount">Your page count</label>
                    <input type="number" name="pagecount" placeholder="pagecount" id="pagecount" className="border rounded-md px-3 py-1" onChange={handleOnChange} defaultValue={props?.pagecount} />
                </div>

                <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="pagecount">Book buttons</label>
                    <BookCardButtons props={props?.bookbuttons} id={props?.id} />
                </div>


            </div>
        </div>
    )
}

export default BookCard;