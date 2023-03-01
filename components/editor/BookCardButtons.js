import Button from "components/Button";
import { EditorContext } from "context/EditorProvider";
import { useContext } from "react";
import BookCardButtonOptions from "./BookCardButtonOptions";

const BookCardButtons = ({ props, id }) => {
    const { editordata, setEditordata } = useContext(EditorContext);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split("-");
        const label = nameParts[0];
        const ID = parseInt(nameParts[1]);



        for (let i = 0; i < editordata.books.length; i++) {
            if (editordata.books[i].id === id) {
                for (let j = 0; j < editordata.books[i].bookbuttons.length; j++) {
                    if (editordata.books[i].bookbuttons[j].id === ID) {
                        let tempED = { ...editordata }
                        tempED.books[i].bookbuttons[j] = { ...tempED.books[i].bookbuttons[j], [label]: value };
                        setEditordata(tempED);
                        break;
                    }
                }
                break;
            }
        }

    }


    const handleAddNewBookButton = (type) => {
        let IDs = 1;
        if (props.length) {
            if (props.length === 1) {
                IDs = props[0].id + 1;
            } else {
                {
                    for (let i = 0; i < props.length; i++) {
                        if (props[i].id >= IDs) {
                            IDs = props[i].id + 1;
                        }
                    }
                }
            }
        }
        let newItem = {};
        if (type === "link") {
            newItem = {
                id: IDs,
                type: "link",
                label: "Purchase",
                url: "example.com"
            }
        } else {
            newItem = {
                id: IDs,
                type: "dropdown",
                label: "Purchase",
                options: [
                    {
                        id: 1,
                        label: "Example",
                        url: "example.com"
                    }
                ]
            }
        }

        const temp = editordata.books.find(item => item.id === id).bookbuttons;
        temp.push(newItem);
        let tempEditorData = { ...editordata };
        tempEditorData.books.find(item => item.id === id).bookbuttons = temp;
        setEditordata(tempEditorData);
    }

    const handleRemove = (ID) => {
        let temp = editordata.books.find(item => item.id === id).bookbuttons;
        temp = temp.filter(item => item.id !== ID);
        let tempEditorData = { ...editordata };
        tempEditorData.books.find(item => item.id === id).bookbuttons = temp;
        setEditordata(tempEditorData);
    }

    const MoveUpHandler = (ID) => {
        let tempEditorData = editordata.books.find(item => item.id === id).bookbuttons;

        // checking if bookbuttons have more than 2 items
        if (tempEditorData.length >= 2) {
            for (let i = 0; i < tempEditorData.length; i++) {
                if (tempEditorData[i].id === ID && i >= 1) {
                    let tempbookbuttons = [...tempEditorData];

                    // swaping values
                    let tempVar = tempbookbuttons[i - 1];
                    tempbookbuttons[i - 1] = tempbookbuttons[i];
                    tempbookbuttons[i] = tempVar;

                    // setting output
                    let tempEData = { ...editordata };
                    tempEData.books.find(item => item.id === id).bookbuttons = tempbookbuttons;
                    setEditordata(tempEData);
                    break;
                }
            }
        }
    }

    
    const MoveDownHandler = (ID) => {
        let tempEditorData = editordata.books.find(item => item.id === id).bookbuttons;
        // checking if bookbuttons have more than 2 items
        if (tempEditorData.length >= 2) {
            for (let i = 0; i < tempEditorData.length; i++) {
                if (tempEditorData[i].id === ID && i < tempEditorData.length - 1) {
                    let tempbookbuttons = [...tempEditorData];

                    // swaping values
                    let tempVar = tempbookbuttons[i + 1];
                    tempbookbuttons[i + 1] = tempbookbuttons[i];
                    tempbookbuttons[i] = tempVar;

                    // setting output
                    let tempEData = { ...editordata };
                    tempEData.books.find(item => item.id === id).bookbuttons = tempbookbuttons;
                    setEditordata(tempEData);
                    break;
                }
            }
        }
    }
    return (
        <div className="border-2 m-1 p-1 rounded-md bg-gray-50">
            {
                props.length ? <div>
                    {
                        props.map((item) => {
                            return item.type === "link" ? (
                                <div key={item.id} className="grid gird-cols-1 border mb-2 rounded-md">
                                    <span className="font-medium py-1 px-2">Link</span>
                                    <input type="text" name={"label-" + item.id} placeholder="Label" className="px-3 py-1 rounded-t-md" onChange={handleOnChange} defaultValue={item?.label} />
                                    <input type="text" name={"url-" + item.id} placeholder="URL" className="border-y px-3 py-1" onChange={handleOnChange} defaultValue={item?.url} />
                                    <div className="flex items-center justify-start gap-1">
                                        <Button type="white" onClick={() => handleRemove(item.id)}>Remove</Button>
                                        <Button type="white" onClick={() => MoveUpHandler(item.id)}>Move up</Button>
                                        <Button type="white" onClick={() => MoveDownHandler(item.id)}>Move down</Button>
                                    </div>
                                </div>
                            ) : (
                                <div key={item.id} className="grid gird-cols-1 border-2 border-[#0891B2] mb-2 rounded-md p-2">
                                    <span className="font-medium px-2 py-1">Dropdown</span>
                                    <input type="text" name={"label-" + item.id} placeholder="Label" className="px-3 py-1 rounded-t-md" onChange={handleOnChange} defaultValue={item?.label} />
                                    <br />
                                    <div className="p-1 border bg-white rounded-md">
                                        <span className="font-normal px-2 py-1 font-medium">Dropdown options</span>
                                        <BookCardButtonOptions props={item.options} idb={id} ido={item.id} />
                                        <div className="flex items-center justify-start gap-1">
                                            <Button type="white" onClick={() => handleRemove(item.id)}>Remove</Button>
                                            <Button type="white" onClick={() => MoveUpHandler(item.id)}>Move up</Button>
                                            <Button type="white" onClick={() => MoveDownHandler(item.id)}>Move down</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : null
            }
            <div className="flex items-center justify-start gap-3">
                <Button onClick={() => handleAddNewBookButton("link")}>Add new link</Button>
                <Button onClick={() => handleAddNewBookButton("dropdown")}>Add new dropdown</Button>
            </div>
        </div>
    )
}

export default BookCardButtons;