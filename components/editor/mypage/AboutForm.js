import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import { UserContext } from 'context/UserProvider'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const AboutForm = () => {
  const { userdata } = useContext(UserContext)
  const [formData, setFormData] = useState({
    bio: '',
  })
  const [errorMessage, setErrorMessage] = useState(formData)
  // api feedback handlers
  const [message, setMessage] = useState(null)
  const [spinner, setSpinner] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    console.log({ name, value })
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(validator(formData))
  }

  const validator = (data) => {
    let err = {}

    if (!data.bio.trim()) {
      err.bio = 'Bio is required!'
    }

    return err
  }

  const SendMessageWithAPI = async () => {
    try {
      setSpinner(true)
      const api = `${process.env.API_HOST}/api/author/update`

      // api request
      const data = {
        username: userdata.username,
        bio: formData.bio,
      }
      console.log({ data })
      const response = await axios.put(api, data)

      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Bio data updated successfully!',
        })
        document.getElementById('sign_up_form').reset()
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
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      SendMessageWithAPI()
    } else {
      console.log(errorMessage)
    }
  }, [errorMessage])

  return (
    <div className="container section">
      <div className="max-w-[380px] p-5 rounded-md shadow-xl m-auto bg-white">
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
        <h3 className="text-[1rem] font-bold text-[#0891B2] text-center mb-5">
          Update your bio
        </h3>

        {/* sing in form  */}
        <form id="sign_up_form">
          <textarea type="text" name="bio" onChange={handleOnChange} id="bio" />
          {errorMessage?.bio ? <span>{errorMessage.bio}</span> : null}

          {/* submit button  */}
          <Button onClick={handleOnSubmit} disable={spinner}>
            {spinner ? <Spinner /> : null}
            {spinner ? 'Sending...' : 'Send message'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AboutForm
