import Button from "components/Button";
import { EditorContext } from "context/EditorProvider";
import { useContext } from "react";

const Links = () => {
    const { editordata, setEditordata } = useContext(EditorContext);

   

    // adding new form
    const handleAddNew = () => {
        const newLink = {
            id: editordata.links.length ? editordata.links[editordata.links.length - 1].id + 1 : 0,
            label: "",
            url: ""
        }

        setEditordata({ ...editordata, ["links"]: [...editordata.links, newLink] });
    }

    // removing form
    const handleRemove = (id) => {
        const newList = editordata.links.filter(item => item.id !== id);
        editordata.links.length && setEditordata({ ...editordata, ["links"]: newList })
    }

    // handling on change event
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split("-");
        const label = nameParts[0];
        const id = parseInt(nameParts[1]);

        let item = { ...editordata };

        for (let i = 0; i < item.links.length; i++) {
            if (item.links[i].id === id) {
                item.links[i] = { ...item.links[i], [label]: value }
            }
        }

        setEditordata(item)
    }
    const MoveUpHandler = (id) => {
        // checking if links have more than 2 items
        if (editordata.links.length >= 2) {
            let item = { ...editordata };
            for (let i = 0; i < item.links.length; i++) {
                if (item.links[i].id === id && i >= 1) {
                    let tempLinks = [...item.links];

                    // swaping values
                    let tempVar = tempLinks[i - 1];
                    tempLinks[i - 1] = tempLinks[i];
                    tempLinks[i] = tempVar;

                    // setting output
                    setEditordata({ ...editordata, ["links"]: tempLinks });
                    break;
                }
            }
        }
    }

    const MoveDownHandler = (id) => {
        // checking if links have more than 2 items
        if (editordata.links.length >= 2) {
            let item = { ...editordata };
            for (let i = 0; i < item.links.length; i++) {
                if (item.links[i].id === id && i < item.links.length - 1) {
                    let tempLinks = [...item.links];

                    // swaping values
                    let tempVar = tempLinks[i + 1];
                    tempLinks[i + 1] = tempLinks[i];
                    tempLinks[i] = tempVar;

                    // setting output
                    setEditordata({ ...editordata, ["links"]: tempLinks });
                    break;
                }
            }
        }
    }
    return (
        <div className="pt-5">
            {
                editordata.links.length ? <div>
                    {
                        editordata.links.map((item) => {
                            return (
                                <div key={item.id} className="grid gird-cols-1 border mb-2 rounded-md">
                                    <input type="text" name={"label-" + item.id} placeholder="Label" className="px-3 py-1 rounded-t-md" onChange={handleOnChange} defaultValue={item?.label} />
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
            <Button onClick={handleAddNew}>Add new link</Button>
        </div>
    )
}

export default Links;