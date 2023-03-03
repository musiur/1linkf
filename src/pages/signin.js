import Button from "components/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "components/icons/Spinner";
import Link from "next/link";
import { UserContext } from "context/UserProvider";
import { useRouter } from "next/router";

const SignIn = () => {
    const Router = useRouter();
    const { userdata, setUserdata } = useContext(UserContext);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(formData);
    const [message, setMessage] = useState(null);
    const [spinner, setSpinner] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(validate(formData));
    }

    const validate = (data) => {
        let obj = {};
        if (!data.username.trim()) {
            obj.username = "Username is required!";
        }
        if (!data.password.trim()) {
            obj.password = "Password is required!";
        }
        return obj;
    }

    const CallAPI = async () => {
        try {
            setSpinner(true);
            const api = `${process.env.API_HOST}/api/auth/signin`;
            const response = await axios.post(api, formData);
            console.log(response);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: "Login successfull!"
                });
                sessionStorage.setItem("access_token", response.data.accessToken);
                sessionStorage.setItem("user_info", JSON.stringify(response.data));
                setUserdata(response.data);
                document.getElementById("sign_up_form").reset();

                const from = sessionStorage.getItem("from");
                if (from) {
                    Router.push(from);
                } else {
                    Router.push("/dashboard/profile");
                }
            } else {
                setMessage({
                    type: false,
                    message: response.response.data.message
                });
            }

            setSpinner(false)
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } catch (error) {
            setSpinner(false)
            setMessage({
                type: false,
                message: error.response ? error.response.data.message : "Something went wrong!"
            });
        }

    }

    useEffect(() => {
        if (Object.keys(errorMessage).length === 0) {
            CallAPI();
        } else {
            console.log(errorMessage);
        }
    }, [errorMessage]);
    return (
        <div className="container section min-h-[80vh]">
            <div className="max-w-[380px] p-5 rounded-md shadow-xl border m-auto">
                {
                    message ? <div className={`${message.type ? "bg-green-400" : "bg-red-600"} text-white px-2 py-[4px] rounded-md mb-2 text-center`}>{message.message}</div> : null
                }
                <h3 className="text-[1rem] font-bold text-[#0891B2] text-center">Welcome to 1link</h3>
                <form id="sign_up_form">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={handleOnChange} id="username" />
                    {
                        errorMessage?.username ? <span>{errorMessage.username}</span> : null
                    }
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={handleOnChange} id="password" />
                    {
                        errorMessage?.password ? <span>{errorMessage.password}</span> : null
                    }
                    <Link href="/forget-password" className="mt-2 text-right">Forget password?</Link>
                    <Button onClick={handleOnSubmit} disable={spinner}>
                        {
                            spinner ? <Spinner /> : null
                        }
                        {
                            spinner ? "Processing" : "Sign in"
                        }
                    </Button>
                </form>
                <div className="flex items-center justify-center gap-3 mt-3">
                    <p>{"Don't"} have an account?</p><Link href="/signup" className="text-[#0891B2]">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;