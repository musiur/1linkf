import axios from 'axios'
import UploadImage from 'components/UploadImage'
import Spinner from 'components/icons/Spinner'
import { LoadingContext } from 'context/LoadingProvider'
import { PathContext } from 'context/PathProvider'
import { PopContext } from 'context/PopProvider'
import { UserContext } from 'context/UserProvider'
import { useContext, useEffect, useState } from 'react'

const HomePageData = () => {
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const { setLoading } = useContext(LoadingContext)
  const { setMessage } = useContext(PopContext)
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

    if (!data.image.trim()) {
      err.image = 'Image is required!'
    }

    // returning error object
    return err
  }

  // api handler function for requesting for saving author data
  const FetchAPI = async () => {
    setLoading(true)
    try {
      // current host name (example: location:3000 in development)
      const host = window.location.host
      const data = { ...formData, username: userdata.username, pathname }

      // api request
      const api = `${process.env.API_HOST}/api/authorpage/${
        upOrCreate === 'update' ? 'update' : 'create'
      }`
      const response =
        upOrCreate === 'create'
          ? await axios.post(api, { ...data, host })
          : await axios.put(api, { ...data, pathname })

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
    } catch (error) {
      // error response interaction
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }

    setLoading(false)
  }

  // calling forget password api each time errorMessage changes
  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      pathname ? FetchAPI() : setMessage('Pathname not found!')
    }
  }, [errorMessage])

  const fetchFormData = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/authorpage/${pathname}`
      const response = await axios.get(api)

      if (response.status === 200) {
        if (response.data.result.length) {
          setFormData(response.data.result[0])
          setUpOrCreate('update')
        } else {
          setUpOrCreate('create')
        }
      } else {
        setUpOrCreate('create')
      }
    } catch (err) {
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    pathname ? fetchFormData() : setMessage('Pathname not found!')
  }, [pathname])

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
              <span className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.title}
              </span>
            ) : null}

            <label htmlFor="description" className="pt-5 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              name="description"
              onChange={handleOnChange}
              placeholder="description"
              className="rounded-md px-3 py-1"
              defaultValue={formData?.description}
            />
            {errorMessage.description ? (
              <span className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.description}
              </span>
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
              <span className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.authorTitle}
              </span>
            ) : null}

            <label htmlFor="authorDescription" className="pt-5 font-semibold">
              Author description
            </label>
            <textarea
              id="authorDescription"
              type="text"
              name="authorDescription"
              onChange={handleOnChange}
              placeholder="authorDescription"
              className="rounded-md px-3 py-1"
              defaultValue={formData?.authorDescription}
            />
            {errorMessage.authorDescription ? (
              <span className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.authorDescription}
              </span>
            ) : null}
            <div className="pt-5"></div>

            {formData.image ? (
              <UploadImage
                func={handleOnChange}
                name="image"
                label="Upload your banner"
                defaultValue={formData?.image}
              />
            ) : null}
            {formData.image === '' ? (
              <UploadImage
                func={handleOnChange}
                name="image"
                label="Upload your banner"
                defaultValue={formData?.image}
              />
            ) : null}
            {errorMessage.image ? (
              <span className="px-3 py-[3px] bg-red-50 text-red-600 border border-red-400 rounded-md">
                {errorMessage.image}
              </span>
            ) : null}
          </div>

          <div className="my-4">
            {/* submit button  */}
            <button
              onClick={handleSubmit}
              className="px-5 py-1 bg-[#0991b2] text-white rounded-md"
            >
              {upOrCreate === 'update' ? 'Update data' : 'Save data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageData
