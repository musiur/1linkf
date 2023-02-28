import { UserContext } from "context/UserProvider";
import Dashboard from "@/pages/dashboard";
import { useContext } from "react";

const Profile = () => {
    const { userdata, setUserdata } = useContext(UserContext);
    const { username, email } = userdata;

    return (
        <Dashboard>
            <div className="p-5">
                <h1 className="text-lg lg:text-xl font-medium mb-5">Profile</h1>
                <div>
                    <p>Name: {username}</p>
                    <p>Email: {email}</p>
                </div>
            </div>
        </Dashboard>
    )
}

export default Profile;