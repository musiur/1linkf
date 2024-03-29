/**
 * author: musiur alam opu
 * title: reset password page
 * description: reset password handlers
 * flow: userinput (handleOnChange) -> input validation (handleOnSubmit) -> apifetching (CallAPI)
 */

import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import NavFooter from 'layout/NavFooter'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// main function of this component
const ResetPassword = () => {
  
  // router
  const Router = useRouter()

  // form management states
  const [formData, setFormData] = useState({ password: '' })
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

    if (!data.password.trim()) {
      err.password = 'Password is required!'
    }

    // returning error object
    return err
  }

  // api handler function for resetting password
  const FetchAPI = async () => {
    try {
      setSpin(true)
      const { username, token } = Router.query

      // api request
      const api = `${process.env.API_HOST}/api/test/user/reset-password/${username}/${token}`
      const response = await axios.post(api, formData)
      
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Password updated successfully!',
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

  // calling reset password api each time errorMessage changes
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      FetchAPI()
    }
  }, [errorMessage])

  return (
    <NavFooter>
<div className="container section flex items-center justify-center gap-3 min-h-[80vh]">
      <div className="max-w-[400px] w-[300px] rounded-md border p-5">

        {/* message showcase according to api responses */}
        {message ? (
          <div
            className={`${
              message.type ? 'bg-green-400' : 'bg-red-600'
            } rounded-md text-center text-white px-3 py-[3px] mb-5`}
          >
            {message.message}
          </div>
        ) : null}
        <h1 className="text-xl text-center font-semibold mb-5">
          Reset password
        </h1>

        {/* reset password form  */}
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            name="password"
            onChange={handleOnChange}
            placeholder="New password"
            className="rounded-md px-3 py-1"
          />
          {errorMessage.password ? (
            <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
              {errorMessage.password}
            </div>
          ) : null}

        </div>

        <div className="my-4">

          {/* submit button  */}
          <Button onClick={handleSubmit}>
            {spin ? (
              <>
                <Spinner /> updating
              </>
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </div>
    </div>
    </NavFooter>
  )
}

export default ResetPassword
