import { UserContext } from "context/UserProvider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Private = ({ children }) => {
    const { userdata, setUserdata } = useContext(UserContext);
    const Router = useRouter();

    // useEffect(() => {
    //     if (!userdata.username) {
    //         Router.push("/signin");
    //     }
    // }, [userdata])
    useEffect(() => {
        const data = sessionStorage.getItem("user_info");
        if (!data) {
            Router.push("/signin")
        }
    }, [])

    return userdata.username ? (
        <>
            {children}
        </>
    ) : (<></>)
}

export default Private;