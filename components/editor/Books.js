import Button from "components/Button";
import { EditorContext } from "context/EditorProvider";
import { useContext } from "react";
import BookCard from "components/editor/BookCard";

const Books = () => {
    const { editordata, setEditordata } = useContext(EditorContext);


    const handleAddNewBook = () => {
        let IDs = 1;
        if (editordata.books.length) {
            if (editordata.books.length === 1) {
                IDs = editordata.books[0].id + 1;
            } else {
                {
                    for (let i = 0; i < editordata.books.length; i++) {
                        if (editordata.books[i].id >= IDs) {
                            IDs = editordata.books[i].id + 1;
                        }
                    }
                }
            }
        }
        const newBook = {
            id: IDs,
            title: "",
            outline: "",
            bookcover: "",
            pagecount: 0,
            bookbuttons: [
                {
                    id: 1,
                    type: "link",
                    label: "Purchase",
                    url: "example.com"
                },
                // {
                //     id: 2,
                //     type: "dropdown",
                //     label: "Purchase",
                //     options: [
                //         {
                //             id: 1,
                //             label: "Example",
                //             url: "example.com"
                //         }
                //     ]
                // }
            ]
        }

        setEditordata({ ...editordata, ["books"]: [...editordata.books, newBook] });
    }

    // removing form
    const handleRemove = (id) => {
        const newList = editordata.books.filter(item => item.id !== id);
        editordata.books.length && setEditordata({ ...editordata, ["books"]: newList })
    }

    const MoveUpHandler = (id) => {
        // checking if books have more than 2 items
        if (editordata.books.length >= 2) {
            let item = { ...editordata };
            for (let i = 0; i < item.books.length; i++) {
                if (item.books[i].id === id && i >= 1) {
                    let tempbooks = [...item.books];

                    // swaping values
                    let tempVar = tempbooks[i - 1];
                    tempbooks[i - 1] = tempbooks[i];
                    tempbooks[i] = tempVar;

                    // setting output
                    setEditordata({ ...editordata, ["books"]: tempbooks });
                    break;
                }
            }
        }
    }

    const MoveDownHandler = (id) => {
        // checking if books have more than 2 items
        if (editordata.books.length >= 2) {
            let item = { ...editordata };
            for (let i = 0; i < item.books.length; i++) {
                if (item.books[i].id === id && i < item.books.length - 1) {
                    let tempbooks = [...item.books];

                    // swaping values
                    let tempVar = tempbooks[i + 1];
                    tempbooks[i + 1] = tempbooks[i];
                    tempbooks[i] = tempVar;

                    // setting output
                    setEditordata({ ...editordata, ["books"]: tempbooks });
                    break;
                }
            }
        }
    }

    return (
        <div className="my-5">
            {
                editordata.books.length ? <div>
                    {
                        editordata.books.map((book) => {
                            return (
                                <div key={book.id} className="border shadow-md mb-4 mt-1 rounded-md">
                                    <BookCard props={book} />
                                    <div className="flex items-center justify-start gap-1 px-4 pb-3">
                                        <Button type="white" onClick={() => handleRemove(book.id)}>Remove</Button>
                                        <Button type="white" onClick={() => MoveUpHandler(book.id)}>Move up</Button>
                                        <Button type="white" onClick={() => MoveDownHandler(book.id)}>Move down</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> : null
            }
            <div className="flex items-center justify-start gap-2">
                <Button onClick={handleAddNewBook}>Add new book</Button><span className="px-3 py-[4px] rounded-full text-[0.8rem] bg-[#DB2777] text-white">Premium</span>
            </div>
        </div>
    )
}

export default Books;