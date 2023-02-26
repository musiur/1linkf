import Button from "components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "components/icons/Spinner";
import Link from "next/link";

const SignIn = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
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
        if (!data.email.trim()) {
            obj.email = "Email is required!";
        }
        if (!data.password.trim()) {
            obj.password = "Password is required!";
        }
        return obj;
    }

    const CallAPI = async () => {
        try {
            setSpinner(true)
            console.log(formData)
            const api = "http://localhost:8080/api/auth/signin";
            const response = await axios.post(api, {
                username: "abul",
                email: "abul@gmail.com",
                password: "abul@gmail.com",
                role: ["user"]
            });
            console.log(response);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: "Login successfull!"
                });
                sessionStorage.setItem("access_token", response.data.accessToken);
                document.getElementById("sign_up_form").reset();
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
            console.log("Error:", error)
            setSpinner(false)
            setMessage({
                type: false,
                message: error.response.data.message
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
        <div className="container section">
            <div className="max-w-[380px] min-w-[310px] m-5 p-5 rounded-md shadow-xl border mx-auto">
                {
                    message ? <div className={`${message.type ? "bg-green-400" : "bg-red-600"} text-white px-2 py-[4px] rounded-md mb-2 text-center`}>{message.message}</div> : null
                }
                <h3 className="text-[1rem] font-bold text-[#0891B2] text-center">Welcome to 1link</h3>
                <form id="sign_up_form">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" onChange={handleOnChange} id="email" />
                    {
                        errorMessage?.email ? <span>{errorMessage.email}</span> : null
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