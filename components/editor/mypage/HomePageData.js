import axios from 'axios'
import Button from 'components/Button'
import UploadImage from 'components/UploadImage'
import Spinner from 'components/icons/Spinner'
import { UserContext } from 'context/UserProvider'
import { useContext, useEffect, useState } from 'react'

const HomePageData = () => {
  const { userdata } = useContext(UserContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    authorTitle: '',
    authorDescription: '',
  })
  const [errorMessage, setErrorMessage] = useState(formData)
  const [upOrCreate, setUpOrCreate] = useState('update')
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

    if (!data.title.trim()) {
      err.title = 'Title is required!'
    }
    if (!data.description.trim()) {
      err.description = 'Description is required!'
    }

    if (!data.authorTitle.trim()) {
      err.authorTitle = 'Author title is required!'
    }

    if (!data.authorDescription.trim()) {
      err.authorDescription = 'Author description is required!'
    }

    // returning error object
    return err
  }

  // api handler function for requesting for resetting password
  const FetchAPI = async () => {
    console.log(formData)
    try {
      setSpin(true)

      // current host name (example: location:3000 in development)
      const host = window.location.host

      const data = { ...formData, username: userdata.username }

      console.log({ data })
      // api request
      const api = `${process.env.API_HOST}/api/authorpage/${
        upOrCreate === 'update' ? 'update' : 'create'
      }`
      const response =
        upOrCreate === 'create'
          ? await axios.post(api, { ...data, host })
          : await axios.put(api, { ...data })

      console.log(response)
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Author page data saved successfully!',
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

  // calling forget password api each time errorMessage changes
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      FetchAPI()
    }
  }, [errorMessage])

  const fetchFormData = async () => {
    try {
      const api = `${process.env.API_HOST}/api/authorpage/${userdata.username}`
      const response = await axios.get(api)
      console.log(response)
      if (response.status === 200) {
        setFormData(response.data.result[0])
      } else {
        setUpOrCreate('create')
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchFormData()
  }, [userdata.username])

  console.log(formData)
  return (
    <div className="w-full">
      <div className="max-w-[700px]">
        <div className="p-5">
          {/* reset password form  */}
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="title" className="pt-5 font-semibold">
              Page title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleOnChange}
              placeholder="title"
              className="rounded-md px-3 py-1"
              defaultValue={formData?.title}
            />
            {errorMessage.title ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.title}
              </div>
            ) : null}

            <label htmlFor="description" className="pt-5 font-semibold">
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              onChange={handleOnChange}
              placeholder="description"
              className="rounded-md px-3 py-1"
              defaultValue={formData?.description}
            />
            {errorMessage.description ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.description}
              </div>
            ) : null}

            <label htmlFor="authorTitle" className="pt-5 font-semibold">
              Author title
            </label>
            <input
              id="authorTitle"
              type="text"
              name="authorTitle"
              onChange={handleOnChange}
              placeholder="authorTitle"
              className="rounded-md px-3 py-1"
              defaultValue={formData?.authorTitle}
            />
            {errorMessage.authorTitle ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.authorTitle}
              </div>
            ) : null}

            <label htmlFor="authorDescription" className="pt-5 font-semibold">
              Author description
            </label>
            <input
              id="authorDescription"
              type="text"
              name="authorDescription"
              onChange={handleOnChange}
              placeholder="authorDescription"
              className="rounded-md px-3 py-1"
              defaultValue={formData?.authorDescription}
            />
            {errorMessage.authorDescription ? (
              <div className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.authorDescription}
              </div>
            ) : null}
            <div className="pt-5"></div>
            <UploadImage
              func={handleOnChange}
              name="image"
              label="Upload your banner picture"
              defaultValue={formData?.image}
            />
          </div>

          {/* message showcase according to api responses */}
          {message ? (
            <div
              className={`${
                message.type ? 'bg-green-600' : 'bg-red-600'
              } rounded-md text-center text-white px-3 py-[3px] mb-5 max-w-[250px]`}
            >
              {message.message}
            </div>
          ) : null}

          <div className="my-4">
            {/* submit button  */}
            <button
              onClick={handleSubmit}
              className="px-5 py-1 bg-[#0991b2] text-white rounded-md"
            >
              {spin ? (
                <>
                  <Spinner /> {upOrCreate === 'update' ? 'Updating' : 'Saving'}
                </>
              ) : upOrCreate === 'update' ? (
                'Update data'
              ) : (
                'Save data'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageData
