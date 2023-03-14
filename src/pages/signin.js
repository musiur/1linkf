/**
 * author: musiur alam opu
 * title: sign in page
 * description: sign in handlers and global
 * flow: userinput (handleOnChange) -> input validation (handleOnSubmit) -> apifetching (CallAPI) -> credential setters to sessionStorage and context api -> redirecting to target location
 */

import Button from 'components/Button'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from 'components/icons/Spinner'
import Link from 'next/link'
import { UserContext } from 'context/UserProvider'
import { useRouter } from 'next/router'

// main function of this component
const SignIn = () => {
  // router
  const Router = useRouter()

  // contexts
  const { userdata, setUserdata } = useContext(UserContext)

  // form management states
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState(formData)

  // api feedback handlers
  const [message, setMessage] = useState(null)
  const [spinner, setSpinner] = useState(false)

  const MakeAuthorProfile = async (username) => {
    try {
      const api = `${process.env.API_HOST}/api/author/create`
      const data = {
        username,
        bio: 'Bio of ' + username,
        blogs: [
          {
            id: 0,
            title: 'Test Blog',
            description: 'This blog is nothing to do',
            link: 'https://youtube.com',
          },
        ],
      }
      const response = await axios.post(api, data)
      console.log(response)
    } catch (error) {
      console.log('Error')
    }
  }

  // input handler depending on onChange event
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) // dynamic setting values to formdata
  }

  // validation on onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(validate(formData))
  }

  // user inputs validator
  const validate = (data) => {
    let obj = {}
    // checking if any value is empty or not
    if (!data.username.trim()) {
      obj.username = 'Username is required!'
    }
    if (!data.password.trim()) {
      obj.password = 'Password is required!'
    }

    // returning error obj
    return obj
  }

  // api handler function for sign in
  const CallAPI = async () => {
    try {
      setSpinner(true)
      const api = `${process.env.API_HOST}/api/auth/signin`

      // api request
      const response = await axios.post(api, formData)

      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Login successfull!',
        })

        // value setter into sessionStorage
        sessionStorage.setItem('access_token', response.data.accessToken)
        sessionStorage.setItem('user_info', JSON.stringify(response.data))
        setUserdata(response.data)
        document.getElementById('sign_up_form').reset()

        // sending back to target location on the site
        const from = sessionStorage.getItem('from')
        MakeAuthorProfile(response.data.username)
        if (from) {
          Router.push(from)
        } else {
          Router.push('/dashboard/editor')
        }
      } else {
        setMessage({
          type: false,
          message: response.response.data.message,
        })
      }

      setSpinner(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      // error response interaction
      setSpinner(false)
      setMessage({
        type: false,
        message: error.response
          ? error.response.data.message
          : 'Something went wrong!',
      })
    }
  }

  // calling sign in api each time errorMessage changes
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      CallAPI()
    }
  }, [errorMessage])

  return (
    <div className="container section min-h-[80vh]">
      <div className="max-w-[380px] p-5 rounded-md shadow-xl border m-auto">
        {/* message showcase according to api responses */}
        {message ? (
          <div
            className={`${
              message.type ? 'bg-green-400' : 'bg-red-600'
            } text-white px-2 py-[4px] rounded-md mb-2 text-center`}
          >
            {message.message}
          </div>
        ) : null}
        <h3 className="text-[1rem] font-bold text-[#0891B2] text-center">
          Welcome to 1link
        </h3>

        {/* sing in form  */}
        <form id="sign_up_form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleOnChange}
            id="username"
          />
          {errorMessage?.username ? <span>{errorMessage.username}</span> : null}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            id="password"
          />
          {errorMessage?.password ? <span>{errorMessage.password}</span> : null}

          {/* forget password link  */}
          <Link href="/forget-password" className="mt-2 text-right">
            Forget password?
          </Link>

          {/* submit button  */}
          <Button onClick={handleOnSubmit} disable={spinner}>
            {spinner ? <Spinner /> : null}
            {spinner ? 'Processing' : 'Sign in'}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-3">
          <p>{"Don't"} have an account?</p>
          <Link href="/signup" className="text-[#0891B2]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
