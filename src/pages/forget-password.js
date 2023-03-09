/**
 * author: musiur alam opu
 * title: forget password page
 * description: forget password handlers
 * flow: userinput (handleOnChange) -> input validation (handleOnSubmit) -> apifetching (CallAPI)
 */


import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import { useEffect, useState } from 'react'

// main function of this component
const ForgetPassword = () => {
  // form management states
  const [formData, setFormData] = useState({ username: '', email: '' })
  const [errorMessage, setErrorMessage] = useState(formData)

  // api feedback handlers
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState(null)

  // input handler depending on onChange event
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) // dynamic setting values ot formdata
  }

  // validation on submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(validator(formData))
  }

  // user input validator
  const validator = (data) => {
    let err = {}

    if (!data.username.trim()) {
      err.username = 'Username is required!'
    }
    if (!data.email.trim()) {
      err.email = 'Email is required!'
    }

    // returning error object
    return err
  }

  // api handler function for requesting for resetting password
  const FetchAPI = async () => {
    try {
      setSpin(true)

      // current host name (example: location:3000 in development)
      const host = window.location.host

      // api request
      const api = `${process.env.API_HOST}/api/test/user/forget-password`
      const response = await axios.post(api, { ...formData, host })
      
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Verification link sent to your mail!',
        })
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
      setSpin(false)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {

      // error response interaction
      setSpin(false)
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // calling forget password api each time errorMessage changes
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      FetchAPI()
    }
  }, [errorMessage])

  return (
    <div className="container section flex items-center justify-center gap-3 min-h-[80vh]">
      <div className="max-w-[400px] w-[300px] rounded-md border p-5">

        {/* message showcase according to api responses */}
        {message ? (
          <div
            className={`${
              message.type ? 'bg-green-600' : 'bg-red-600'
            } rounded-md text-center text-white px-3 py-[3px] mb-5`}
          >
            {message.message}
          </div>
        ) : null}
        <h1 className="text-xl text-center font-semibold mb-5">
          Forget password
        </h1>

        {/* reset password form  */}
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            name="username"
            onChange={handleOnChange}
            placeholder="Username"
            className="rounded-md px-3 py-1"
          />
          {errorMessage.username ? (
            <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
              {errorMessage.username}
            </div>
          ) : null}
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            placeholder="Email to send verification link"
            className="rounded-md px-3 py-1"
          />
          {errorMessage.email ? (
            <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
              {errorMessage.email}
            </div>
          ) : null}
        </div>
        <div className="my-4">

          {/* submit button  */}
          <Button onClick={handleSubmit}>
            {spin ? (
              <>
                <Spinner /> Sending
              </>
            ) : (
              'Send request'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
