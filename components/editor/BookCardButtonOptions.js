import { EditorContext } from "context/EditorProvider";
import { useContext } from "react";

const { default: Button } = require("components/Button")

const BookCardButtonOptions = ({ props, idb, ido }) => {
    const { editordata, setEditordata } = useContext(EditorContext);



    // adding new form
    const handleAddNew = () => {
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
        const newOption = {
            id: IDs,
            label: "Example",
            url: "example.com"
        }


        for (let i = 0; i < editordata.books.length; i++) {
            if (editordata.books[i].id === idb) {
                for (let j = 0; j < editordata.books[i].bookbuttons.length; j++) {
                    if (editordata.books[i].bookbuttons[j].id === ido) {
                        const tempBBoptions = { ...editordata };
                        tempBBoptions.books[i].bookbuttons[j].options = [...tempBBoptions.books[i].bookbuttons[j].options, newOption];
                        setEditordata(tempBBoptions)
                    }
                }
            }
        }
    }

    // removing form
    const handleRemove = (id) => {
        for (let i = 0; i < editordata.books.length; i++) {
            if (editordata.books[i].id === idb) {
                for (let j = 0; j < editordata.books[i].bookbuttons.length; j++) {
                    if (editordata.books[i].bookbuttons[j].id === ido) {
                        const tempBBoptions = { ...editordata };
                        tempBBoptions.books[i].bookbuttons[j].options = [...tempBBoptions.books[i].bookbuttons[j].options.filter(item => item.id !== id)];
                        setEditordata(tempBBoptions)
                    }
                }
            }
        }
    }

    // handling on change event
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split("-");
        const label = nameParts[0];
        const id = parseInt(nameParts[1]);

        for (let i = 0; i < editordata.books.length; i++) {
            if (editordata.books[i].id === idb) {
                for (let j = 0; j < editordata.books[i].bookbuttons.length; j++) {
                    if (editordata.books[i].bookbuttons[j].id === ido) {
                        for (let k = 0; k < editordata.books[i].bookbuttons[j].options.length; k++) {
                            if (editordata.books[i].bookbuttons[j].options[k].id === id) {
                                let tempED = { ...editordata }
                                tempED.books[i].bookbuttons[j].options[k] = { ...tempED.books[i].bookbuttons[j].options[k], [label]: value };
                                setEditordata(tempED);
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    const MoveUpHandler = (id) => {
        let tempEditorData = editordata.books.find(item => item.id === idb).bookbuttons.find(item => item.id === ido).options;

        // checking if bookbuttons have more than 2 items
        if (tempEditorData.length >= 2) {
            for (let i = 0; i < tempEditorData.length; i++) {
                if (tempEditorData[i].id === id && i >= 1) {
                    let tempbookbuttons = [...tempEditorData];

                    // swaping values
                    let tempVar = tempbookbuttons[i - 1];
                    tempbookbuttons[i - 1] = tempbookbuttons[i];
                    tempbookbuttons[i] = tempVar;

                    // setting output
                    let tempEData = { ...editordata };
                    tempEData.books.find(item => item.id === idb).bookbuttons.find(item => item.id === ido).options = tempbookbuttons;
                    setEditordata(tempEData);
                    break;
                }
            }
        }
    }

    const MoveDownHandler = (id) => {
        let tempEditorData = editordata.books.find(item => item.id === idb).bookbuttons.find(item => item.id === ido).options;

        // checking if bookbuttons have more than 2 items
        if (tempEditorData.length >= 2) {
            for (let i = 0; i < tempEditorData.length; i++) {
                if (tempEditorData[i].id === id && i < tempEditorData.length - 1) {
                    let tempbookbuttons = [...tempEditorData];

                    // swaping values
                    let tempVar = tempbookbuttons[i + 1];
                    tempbookbuttons[i + 1] = tempbookbuttons[i];
                    tempbookbuttons[i] = tempVar;

                    // setting output
                    let tempEData = { ...editordata };
                    tempEData.books.find(item => item.id === idb).bookbuttons.find(item => item.id === ido).options = tempbookbuttons;
                    setEditordata(tempEData);
                    break;
                }
            }
        }
    }
    return (
        <div>
            {
                props.length ? <div>
                    {
                        props.map((item) => {
                            return (
                                <div key={item.id} className="grid gird-cols-1 border mb-2 rounded-md">
                                    <input type="text" name={"label-" + item.id} placeholder="Label" className="px-3 py-1 rounded-t-md" onChange={handleOnChange} defaultValue={item?.label} />
                                    {/* // option adder  */}
                                    <input type="text" name={"url-" + item.id} placeholder="URL" className="border-y px-3 py-1" onChange={handleOnChange} defaultValue={item?.url} />
                                    <div className="flex items-center justify-start gap-1">
                                        <Button type="white" onClick={() => handleRemove(item.id)}>Remove</Button>
                                        <Button type="white" onClick={() => MoveUpHandler(item.id)}>Move up</Button>
                                        <Button type="white" onClick={() => MoveDownHandler(item.id)}>Move down</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : null
            }
            <Button onClick={handleAddNew}>Add new Option</Button>
        </div>
    )
}

export default BookCardButtonOptions;