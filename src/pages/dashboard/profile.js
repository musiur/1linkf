import { UserContext } from "context/UserProvider";
import Dashboard from "@/pages/dashboard";
import { useContext } from "react";

const Profile = () => {
    const {userdata, setUserdata} = useContext(UserContext);
    const {username, email, role} = userdata;
    return (
        <Dashboard>
            <div>
            <h1>Profile</h1>
            <div>
                <p>Name: {username}</p>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
            </div>
            </div>
        </Dashboard>
    )
}

export default Profile;