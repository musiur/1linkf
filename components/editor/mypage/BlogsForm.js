import axios from 'axios'
import Button from 'components/Button'
import UploadImage from 'components/UploadImage'
import { LoadingContext } from 'context/LoadingProvider'
import { PathContext } from 'context/PathContext'
import { UserContext } from 'context/UserProvider'
import { useContext, useEffect, useState } from 'react'

const BlogsForm = () => {
  const { setLoading } = useContext(LoadingContext)
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState(null)

  const deleteBlog = async (_id) => {
    setLoading(true)
    if (_id) {
      try {
        const api = `${process.env.API_HOST}/api/blogs/delete/${_id}`
        const response = await axios.delete(api)
        if (response.status === 200) {
          setBlogs([...blogs.filter((item) => item._id !== _id)])
          setMessage({
            type: true,
            message: 'Deleted successfully!',
          })
        } else {
          setMessage({
            type: false,
            message: 'Something went wrong!',
          })
        }
      } catch (error) {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    setLoading(false)
  }

  const FetchBlogs = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/blogs/${userdata.username}/${pathname}`
      const response = await axios.get(api)
      if (response.status === 200) {
        setBlogs(response.data.result)
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    } catch (error) {
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    FetchBlogs()
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [])

  return (
    <div className="container section">
      {message ? (
        <span
          className={`${
            message.type ? 'bg-green-400' : 'bg-red-400'
          } text-white rounded-md px-6 font-semibold py-2 fixed top-[100px] right-0 m-5 z-10 shadow-xl`}
        >
          {message.message}
        </span>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {blogs.length
          ? [...blogs].reverse().map((item) => {
              return (
                <div
                  key={item._id}
                  className="shadow-md rounded-lg border hover:shadow-xl bg-white"
                >
                  <img src={item.image} alt="" className="rounded-t-lg" />
                  <div className="p-3 lg:p-5">
                    <div className="grid grid-cols-1 gap-3 pb-5">
                      <h2 className="font-bold text-md lg:text-lg">
                        {item.title}
                      </h2>
                      <h4 className="font-semibold text-gray-600">
                        {item.subTitle}
                      </h4>
                      <p className="text-gray-400">
                        {item.shortDescription.slice(0, 200)}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-5">
                      <button
                        className="px-4 py-[5px] rounded-md  text-white hover:bg-[#0991b270] bg-[#0991b2]"
                        onClick={() => {
                          setIdToUpdate(item._id)
                          setUpdateForm(true)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-[5px] rounded-md  text-white hover:bg-red-300 bg-red-400"
                        onClick={() => deleteBlog(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          : null}
        {createForm ? (
          <NewBlog
            setCreateForm={setCreateForm}
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
          />
        ) : null}
        {updateForm ? (
          <UpdateBlog
            setUpdateForm={setUpdateForm}
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
            _id={idToUpdate}
          />
        ) : null}
        <div
          className="border-4 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer p-5 hover:bg-gray-400 hover:text-white font-bold text-gray-400 w-full h-[60px] shadow-md hover:shadow-xl"
          onClick={() => setCreateForm(true)}
        >
          Add a new Blog
        </div>
      </div>
    </div>
  )
}

export default BlogsForm

const NewBlog = ({ setCreateForm, blogs, setBlogs, setMessage }) => {
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const { setLoading } = useContext(LoadingContext)
  const DefaultFormData = {
    title: '',
    subTitle: '',
    shortDescription: '',
    image: '',
    details: '',
  }
  const [formData, setFormData] = useState(DefaultFormData)
  const [errorMessage, setErrorMessage] = useState(formData)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(validator(formData))
  }

  const validator = (data) => {
    let obj = {}
    if (!data.title.trim()) {
      obj.title = 'Title is required!'
    }
    if (!data.subTitle.trim()) {
      obj.subTitle = 'Sub Title is required!'
    }
    if (!data.shortDescription.trim()) {
      obj.shortDescription = 'Short Description is required!'
    }
    if (!data.details.trim()) {
      obj.details = 'Details is required!'
    }

    return obj
  }

  const CreateBlogAPI = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/blogs/create`
      const response = await axios.post(api, {
        ...formData,
        username: userdata.username,
        pathname,
      })
      if (response.status === 200) {
        const newBlog = { _id: response.data.result._id, ...formData }
        setFormData(DefaultFormData)
        setBlogs([...blogs, newBlog])
        setMessage({
          type: true,
          message: 'Blog created successfully!',
        })
        setCreateForm(false)
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
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
    if (Object.keys(errorMessage).length === 0) {
      CreateBlogAPI()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }, [errorMessage])
  return (
    <div
      className="fixed w-full h-[100vh] bg-[#00000030] left-0 top-0 overflow-y-scroll py-5"
      style={{ zIndex: '999999' }}
    >
      <form
        id="blogCreateForm"
        className="relative grid grid-cols-1 gap-3 min-w-[310px] max-w-[500px] bg-white shadow-xl rounded p-3 lg:p-5 mx-auto"
      >
        <div
          className="absolute top-0 right-0 w-[20px] h-[20px] cursor-pointer hover:text-red-400 border hover:border-red-400 rounded-full m-2 flex items-center justify-center"
          onClick={() => setCreateForm(false)}
        >
          X
        </div>
        <h1 className="text-lg lg:text-xl font-semibold lg:font-bold mb-5 text-center">
          Create New Blog
        </h1>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            id="title"
            className="px-2 py-1 rounded-md hover:shadow-md"
            defaultValue={formData?.title}
          />
          {errorMessage?.title ? (
            <span className="py-[4px] text-red-400">{errorMessage.title}</span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="subTitle">Sub Title</label>
          <input
            type="text"
            name="subTitle"
            onChange={handleOnChange}
            id="subTitle"
            className="px-2 py-1 rounded-md hover:shadow-md"
            defaultValue={formData?.subTitle}
          />
          {errorMessage?.subTitle ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.subTitle}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            type="text"
            name="shortDescription"
            onChange={handleOnChange}
            id="shortDescription"
            className="px-2 py-1 rounded-md hover:shadow-md min-h-[100px]"
            defaultValue={formData?.shortDescription}
          />
          {errorMessage?.shortDescription ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.shortDescription}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="details">Details</label>
          <textarea
            type="text"
            name="details"
            onChange={handleOnChange}
            id="details"
            className="px-2 py-1 rounded-md hover:shadow-md min-h-[200px]"
            defaultValue={formData?.details}
          />
          {errorMessage?.details ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.details}
            </span>
          ) : null}
        </div>

        <div>
          <UploadImage
            func={handleOnChange}
            name="image"
            label="Upload image"
            defaultValue={formData?.image}
          />
        </div>
        <div className="pt-5">
          <Button onClick={handleOnSubmit}>Create</Button>
        </div>
      </form>
    </div>
  )
}

const UpdateBlog = ({ setUpdateForm, blogs, setBlogs, setMessage, _id }) => {
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const { setLoading } = useContext(LoadingContext)
  const [formData, setFormData] = useState(
    blogs.filter((item) => item._id === _id)[0]
  )
  const [errorMessage, setErrorMessage] = useState({})
  const [edited, setEdited] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setEdited(true)
    setErrorMessage(validator(formData))
  }

  const validator = (data) => {
    let obj = {}
    if (!data.title.trim()) {
      obj.title = 'Title is required!'
    }
    if (!data.subTitle.trim()) {
      obj.subTitle = 'Sub Title is required!'
    }
    if (!data.shortDescription.trim()) {
      obj.shortDescription = 'Short Description is required!'
    }
    if (!data.details.trim()) {
      obj.details = 'Details is required!'
    }

    return obj
  }

  const UpdateBlogAPI = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/blogs/update`
      const payload = {
        ...formData,
        username: userdata.username,
        pathname,
      }
      const response = await axios.put(api, payload)
      if (response.status === 200) {
        const tempBlogData = [...blogs]
        for (let i = 0; i < tempBlogData.length; i++) {
          if (tempBlogData[i]._id === _id) {
            tempBlogData[i] = payload
            break
          }
        }
        setBlogs(tempBlogData)
        setMessage({
          type: true,
          message: 'Blog updated successfully!',
        })
      } else {
        setMessage({
          type: false,
          message: 'Update unsuccessful',
        })
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
    if (edited && Object.keys(errorMessage).length === 0) {
      UpdateBlogAPI()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }, [errorMessage])

  return (
    <div
      className="fixed w-full h-[100vh] bg-[#00000030] left-0 top-0 overflow-y-scroll py-5"
      style={{ zIndex: '9999' }}
    >
      <form
        id="blogCreateForm"
        className="relative grid grid-cols-1 gap-3 min-w-[310px] max-w-[500px] bg-white shadow-xl rounded p-3 lg:p-5 mx-auto"
      >
        <div
          className="absolute top-0 right-0 w-[20px] h-[20px] cursor-pointer hover:text-red-400 border hover:border-red-400 rounded-full m-2 flex items-center justify-center"
          onClick={() => setUpdateForm(false)}
        >
          X
        </div>
        <h1 className="text-lg lg:text-xl font-semibold lg:font-bold mb-5 text-center">
          Update Blog
        </h1>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            id="title"
            className="px-2 py-1 rounded-md hover:shadow-md"
            defaultValue={formData?.title}
          />
          {errorMessage?.title ? (
            <span className="py-[4px] text-red-400">{errorMessage.title}</span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="subTitle">Sub Title</label>
          <input
            type="text"
            name="subTitle"
            onChange={handleOnChange}
            id="subTitle"
            className="px-2 py-1 rounded-md hover:shadow-md"
            defaultValue={formData?.subTitle}
          />
          {errorMessage?.subTitle ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.subTitle}
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            type="text"
            name="shortDescription"
            onChange={handleOnChange}
            id="shortDescription"
            className="px-2 py-1 rounded-md hover:shadow-md min-h-[100px]"
            defaultValue={formData?.shortDescription}
          />
          {errorMessage?.shortDescription ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.shortDescription}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="details">Details</label>
          <textarea
            type="text"
            name="details"
            onChange={handleOnChange}
            id="details"
            className="px-2 py-1 rounded-md hover:shadow-md min-h-[200px]"
            defaultValue={formData?.details}
          />
          {errorMessage?.details ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.details}
            </span>
          ) : null}
        </div>

        <div>
          <UploadImage
            func={handleOnChange}
            name="image"
            label="Upload image"
            defaultValue={formData?.image}
          />
        </div>
        <div className="pt-5">
          <Button onClick={handleOnSubmit}>Update</Button>
        </div>
      </form>
    </div>
  )
}
