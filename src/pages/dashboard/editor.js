import Dashboard from "@/pages/dashboard";
import Button from "components/Button";
import Appearance from "components/editor/Appearance";
import Books from "components/editor/Books";
import Header from "components/editor/Header";
import Links from "components/editor/Links";
import SocialLinks from "components/editor/SocialLinks";
import { EditorContext } from "context/EditorProvider";
import { useContext, useState } from "react";


const Editor = () => {
    const tabs = ["Header",
        "Social links",
        "Links",
        "Books",
        "Appearance"];
    const [currentTab, setCurrentTab] = useState("Header");
    const { editordata, setEditordata } = useContext(EditorContext);
    console.log(editordata)
    return (
        <Dashboard>
            <div className="p-5 bg-[#F1F2F3]">
                <h1 className="text-lg lg:text-xl font-bold mb-5">Editor</h1>
                <div className="flex flex-wrap items-start justify-between gap-10 ">
                    <div className="bg-white rounded-md p-5">
                        <div className="flex items-center justify-between gap-[50px]">
                            <div className="flex items-center justify-start gap-4">
                                {
                                    tabs.map((tab) => {
                                        return (
                                            <div key={tab} onClick={() => setCurrentTab(tab)} className={`border-b-2 ${currentTab === tab ? "border-[#0891B2] text-[#0891B2]" : "border-white text-black"} cursor-pointer`}>
                                                {tab}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className="bg-[#0891B2] text-white px-4 py-1 rounded-md hover:bg-[#0891B295]">Save</button>
                        </div>
                        {
                            currentTab === "Header" ? <Header /> : currentTab === "Social links" ? <SocialLinks /> : currentTab === "Links" ? <Links /> : currentTab === "Books" ? <Books /> : currentTab === "Appearance" ? <Appearance /> : null
                        }
                    </div>
                    <div className="min-w-[500px] min-h-[800px] rounded-xl shadow-xl border bg-white"></div>
                </div>
            </div>
        </Dashboard>
    )
}

export default Editor;