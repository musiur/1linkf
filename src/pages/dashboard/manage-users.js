import Dashboard from "@/pages/dashboard";
import axios from "axios";
import Button from "components/Button";
import Spinner from "components/icons/Spinner";
import { useEffect, useState } from "react";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(null)

    const FetchUsersData = async () => {
        try {
            setShowSpinner(true)
            const response = await axios.get(`${process.env.API_HOST}/api/test/user`, {
                headers: {
                    "x-access-token": sessionStorage.getItem("access_token")
                }
            });
            if (response.status === 200) {
                setUsers(Object.values(response.data))
            }
            setShowSpinner(false)
        } catch (error) {
            setShowSpinner(false)
        }
    }
    useEffect(() => {
        FetchUsersData();
    }, []);

    console.log(users)
    return (
        <Dashboard>
            <div className="relative p-5">
                <h1 className="text-lg lg:text-xl font-bold mb-5">Manage Users</h1>
                {
                    users.length ? <div className="grid grid-cols-4 gap-4">
                        {
                            users[0].map((item) => {
                                return (
                                    <div key={item._id} className="border rounded-md p-5 hover:border-[#0991b2]">
                                        <p className="font-medium">Username: {item.username}</p>
                                        <p>Email: {item.email}</p>
                                        <div className="flex items-center justify-start gap-1 mt-4">
                                            <Button onClick={() => { setSelected(item._id); setEdit(true) }}>Update</Button>
                                            <Button type="warning">Delete</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> : showSpinner ? <div className="bg-gray-400 px-3 py-1 rounded-md flex gap-1 items-center max-w-[130px] text-white"><Spinner /> loading...</div> : <div>No user found!</div>
                }
                {
                    edit ? <div className="absolute top-0 left-0 w-full h-full bg-[#00000050] flex items-start justify-center pt-10">
                        <div className="bg-white p-5 rounded-md border min-w-[310px]" onClick={() => setEdit(false)}>ID: {selected}</div>
                    </div> : null
                }
            </div>
        </Dashboard>
    )
}

export default ManageUsers;