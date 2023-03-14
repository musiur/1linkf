import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const Contact = () => {
  const Router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  })
  const [errorMessage, setErrorMessage] = useState(formData)

  const [userdata, setUserdata] = useState([])
  const FetchUserData = async () => {
    try {
      const api = `${process.env.API_HOST}/api/test/user/data`
      console.log({username: Router.query.linkpath[0]})
      const response = await axios.post(api, {username: Router.query.linkpath[0]})
      if (response.status === 200) {
        setUserdata(response.data.data);
      } else {
        console.log('user data not fetch!')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FetchUserData()
  }, [])

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

    if (!data.name.trim()) {
      err.name = 'Name is required!'
    }
    if (!data.email.trim()) {
      err.email = 'Email is required!'
    }
    if (!data.message.trim()) {
      err.message = 'Message is required!'
    }
    if (!data.subject.trim()) {
      err.subject = 'Subject is required!'
    }

    return err
  }

  const SendMessageWithAPI = async () => {
    try {
      setSpinner(true)
      const api = `${process.env.API_HOST}/api/author/mail`

      // api request
      const data = {
        username: userdata.username,
        name: formData.name,
        to: userdata.email,
        from: formData.email,
        subject: formData.subject,
        message: formData.message,
      }
      console.log({ data })
      const response = await axios.post(api, data)

      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Message sent successfully!',
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

  console.log(userdata)
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
        <h3 className="text-[1rem] font-bold text-[#0891B2] text-center">
          Contact
        </h3>

        {/* sing in form  */}
        <form id="sign_up_form">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={handleOnChange} id="name" />
          {errorMessage?.name ? <span>{errorMessage.name}</span> : null}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            id="email"
          />
          {errorMessage?.email ? <span>{errorMessage.email}</span> : null}

          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            onChange={handleOnChange}
            id="subject"
          />
          {errorMessage?.subject ? <span>{errorMessage.subject}</span> : null}

          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            name="message"
            onChange={handleOnChange}
            id="message"
          />
          {errorMessage?.message ? <span>{errorMessage.message}</span> : null}

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

export default Contact
