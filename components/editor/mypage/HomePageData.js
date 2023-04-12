import Button from 'components/Button'
import { useEffect, useState } from 'react'

const HomePageData = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    authorTitle: "",
    authorDescription: ""
  })
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
    //   const host = window.location.host

    //   // api request
    //   const api = `${process.env.API_HOST}/api/test/user/forget-password`
    //   const response = await axios.post(api, { ...formData, host })

    //   if (response.status === 200) {
    //     setMessage({
    //       type: true,
    //       message: 'Verification link sent to your mail!',
    //     })
    //   } else {
    //     setMessage({
    //       type: false,
    //       message: 'Something went wrong!',
    //     })
    //   }
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
    <div>
      <div className="">
        <div className="p-5">
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
          

          {/* reset password form  */}
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              placeholder="title"
              className="rounded-md px-3 py-1"
            />
            {errorMessage.title ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.title}
              </div>
            ) : null}
            
            <input
              type="text"
              name="description"
              onChange={handleOnChange}
              placeholder="description"
              className="rounded-md px-3 py-1"
            />
            {errorMessage.description ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.description}
              </div>
            ) : null}

            <input
              type="text"
              name="authorTitle"
              onChange={handleOnChange}
              placeholder="authorTitle"
              className="rounded-md px-3 py-1"
            />
            {errorMessage.authorTitle ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.authorTitle}
              </div>
            ) : null}

            {/* <input
              type="text"
              name="authorDescription"
              onChange={handleOnChange}
              placeholder="authorDescription"
              className="rounded-md px-3 py-1"
            />
            {errorMessage.authorDescription ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.authorDescription}
              </div>
            ) : null} */}

            

            <input
              type="file"
              name="image"
              onChange={handleOnChange}
              placeholder="image"
              className="rounded-md px-3 py-1"
            />
            {errorMessage.image ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.image}
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
    </div>
  )
}

export default HomePageData
