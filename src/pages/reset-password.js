import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ResetPassword = () => {
  const Router = useRouter()
  const [formData, setFormData] = useState({ password: '' })
  const [errorMessage, setErrorMessage] = useState(formData)
  const [spin, setSpin] = useState(false)
  const [message, setMessage] = useState(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(validator(formData))
  }

  const validator = (data) => {
    let err = {}

    if (!data.password.trim()) {
      err.password = 'Password is required!'
    }

    return err
  }

  const FetchAPI = async () => {
    try {
      setSpin(true)
      const { username, token } = Router.query
      const api = `${process.env.API_HOST}/api/test/user/reset-password/${username}/${token}`
      const response = await axios.post(api, formData)
      console.log(response)
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
      console.log(error)
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
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      FetchAPI()
    } else {
      console.log(errorMessage)
    }
  }, [errorMessage])
  return (
    <div className="container section flex items-center justify-center gap-3">
      <div className="max-w-[400px] w-[300px] rounded-md border p-5">
        {message ? (
          <div
            className={`${
              message.type ? 'bg-green-600' : 'bg-red-600'
            } rounded-md text-center text-white`}
          >
            {message.message}
          </div>
        ) : null}
        <h1 className="text-xl text-center font-semibold mb-5">
          Reset password
        </h1>
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
  )
}

export default ResetPassword
