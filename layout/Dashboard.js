import Link from "next/link";
import { useRouter } from "next/router";
import Private from "./Private";

const Dashboard = ({ children }) => {
    const tabs = ["Profile", "Editor", "My page", "Manage users", "Add moderator"];
    const Router = useRouter();
    return (
        <Private>
            <div className="grid grid-cols-12">
                <div className="col-span-2 bg-[#0891B2] p-5 min-h-[90vh] h-full flex flex-col gap-1 justify-start items-start text-white">
                    {
                        tabs.map((item) => {
                            const tab = item.replaceAll(" ", "-").toLowerCase();
                            return (
                                <Link href={`/dashboard/${tab}`} key={item} className={`w-full cursor-pointer px-3 py-1 rounded-md ${Router.pathname.includes(tab) ? "bg-[#ffffff50] hover:bg-[#ffffff30]" : "hover:bg-[#ffffff20]"}`}>{item}</Link>
                            )
                        })
                    }
                </div>
                <div className="col-span-10 p-5">
                    {children}
                </div>
            </div>
        </Private>
    )
}

export default Dashboard;