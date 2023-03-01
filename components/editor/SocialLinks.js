import Button from "components/Button";
import { EditorContext } from "context/EditorProvider";
import { useContext } from "react";

const SocialLinks = () => {
    const { editordata, setEditordata } = useContext(EditorContext);

    const linksList = ["Facebook", "Twitter", "Linkedin", "Instagram", "TitTok", "Youtube", "Spotify", "Amazon", "Email", "Pinterest", "Paypal", "Google Play"];

    // adding new form
    const handleAddNew = () => {
        const newLink = {
            id: editordata.socialLinks.length ? editordata.socialLinks[editordata.socialLinks.length - 1].id + 1 : 0,
            label: "",
            url: ""
        }

        setEditordata({ ...editordata, ["socialLinks"]: [...editordata.socialLinks, newLink] });
    }

    // removing form
    const handleRemove = (id) => {
        const newList = editordata.socialLinks.filter(item => item.id !== id);
        editordata.socialLinks.length && setEditordata({ ...editordata, ["socialLinks"]: newList })
    }

    // handling on change event
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split("-");
        const label = nameParts[0];
        const id = parseInt(nameParts[1]);

        let item = { ...editordata };

        for (let i = 0; i < item.socialLinks.length; i++) {
            if (item.socialLinks[i].id === id) {
                item.socialLinks[i] = { ...item.socialLinks[i], [label]: value }
            }
        }

        setEditordata(item)
    }
    const MoveUpHandler = (id) => {
        // checking if socialLinks have more than 2 items
        if (editordata.socialLinks.length >= 2) {
            let item = { ...editordata };
            for (let i = 0; i < item.socialLinks.length; i++) {
                if (item.socialLinks[i].id === id && i >= 1) {
                    let tempsocialLinks = [...item.socialLinks];

                    // swaping values
                    let tempVar = tempsocialLinks[i - 1];
                    tempsocialLinks[i - 1] = tempsocialLinks[i];
                    tempsocialLinks[i] = tempVar;

                    // setting output
                    setEditordata({ ...editordata, ["socialLinks"]: tempsocialLinks });
                    break;
                }
            }
        }
    }

    const MoveDownHandler = (id) => {
        // checking if socialLinks have more than 2 items
        if (editordata.socialLinks.length >= 2) {
            let item = { ...editordata };
            for (let i = 0; i < item.socialLinks.length; i++) {
                if (item.socialLinks[i].id === id && i < item.socialLinks.length - 1) {
                    let tempsocialLinks = [...item.socialLinks];

                    // swaping values
                    let tempVar = tempsocialLinks[i + 1];
                    tempsocialLinks[i + 1] = tempsocialLinks[i];
                    tempsocialLinks[i] = tempVar;

                    // setting output
                    setEditordata({ ...editordata, ["socialLinks"]: tempsocialLinks });
                    break;
                }
            }
        }
    }
    return (
        <div className="pt-5">
            {
                editordata.socialLinks.length ? <div>
                    {
                        editordata.socialLinks.map((item) => {
                            return (
                                <div key={item.id} className="grid gird-cols-1 border mb-2 rounded-md">
                                    <select name={"label-" + item.id} defaultValue={item?.label} onChange={handleOnChange} className="rounded-md px-2 py-1">
                                        {
                                            linksList.map((opt) => {
                                                return (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                )
                                            })
                                        }
                                    </select>
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

export default SocialLinks;