import Dashboard from "@/pages/dashboard";
import axios from "axios";
import Button from "components/Button";
import { useEffect, useState } from "react";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const FetchUsersData = async () => {
        try {
            const response = await axios.get(`${process.env.API_HOST}/api/test/all`);
            if (response.status === 200) {
                setUsers(Object.values(response.data))
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    useEffect(() => {
        FetchUsersData();
    }, []);


    return (
        <Dashboard>
            <div>
                <h1>Manage Users</h1>
                {
                    users.length ? <div className="grid grid-cols-4 gap-4">
                        {
                            users.map((item) => {
                                console.log(item)
                                return (
                                    <div key={item._id} className="border rounded-md p-5 hover:border-[#0991b2]">
                                        <p className="font-medium">Username: {item.username}</p>
                                        <p>Email: {item.email}</p>
                                        <div className="flex items-center justify-start gap-1 mt-4">
                                            <Button>Update</Button>
                                            <Button type="warning">Delete</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> : <div>No user found!</div>
                }
            </div>
        </Dashboard>
    )
}

export default ManageUsers;