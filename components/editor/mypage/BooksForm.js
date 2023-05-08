import axios from 'axios'
import Button from 'components/Button'
import UploadImage from 'components/UploadImage'
import BlogEditor from 'components/blog-editor/BlogEditor'
import { LoadingContext } from 'context/LoadingProvider'
import { PathContext } from 'context/PathProvider'
import { UserContext } from 'context/UserProvider'
import { useContext, useEffect, useState } from 'react'

const BooksForm = () => {
  const { setLoading } = useContext(LoadingContext)
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const [books, setBooks] = useState([])
  const [message, setMessage] = useState(null)
  const [createForm, setCreateForm] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [idToUpdate, setIdToUpdate] = useState(null)

  const deleteBook = async (_id) => {
    setLoading(true)
    if (_id) {
      try {
        const api = `${process.env.API_HOST}/api/books/delete/${_id}`
        const response = await axios.delete(api)
        if (response.status === 200) {
          setBooks([...books.filter((item) => item._id !== _id)])
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

  const FetchBooks = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/books/${userdata.username}/${pathname}`
      const response = await axios.get(api)
      if (response.status === 200) {
        setBooks(response.data.result)
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage({
          type: false,
          message: 'No Books Found!',
        })
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    FetchBooks()
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
      <button
        className="border-4 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer px-5 py-2 hover:bg-gray-400 hover:text-white font-bold text-gray-400 shadow-md hover:shadow-xl mb-5"
        onClick={() => setCreateForm(true)}
      >
        Add a new Book
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {books.length
          ? [...books].reverse().map((item) => {
              return (
                <div
                  key={item._id}
                  className="shadow-md rounded-lg border hover:shadow-xl bg-white"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="rounded-t-lg w-full"
                  />
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
                      <a href={item.purchaseLink} target="_blank">
                        <button className="border hover:shadow-md px-2 py-1 rounded-md break-all">
                          Purchase: {item.purchaseLink.slice(0, 20)}...
                        </button>
                      </a>
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
                        onClick={() => deleteBook(item._id)}
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
          <NewBook
            setCreateForm={setCreateForm}
            setBooks={setBooks}
            books={books}
            setMessage={setMessage}
          />
        ) : null}
        {updateForm ? (
          <UpdateBook
            setUpdateForm={setUpdateForm}
            setBooks={setBooks}
            books={books}
            setMessage={setMessage}
            _id={idToUpdate}
          />
        ) : null}
      </div>
    </div>
  )
}

export default BooksForm

const NewBook = ({ setCreateForm, books, setBooks, setMessage }) => {
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const { setLoading } = useContext(LoadingContext)
  const DefaultFormData = {
    title: '',
    subTitle: '',
    shortDescription: '',
    image: '',
    details: '',
    purchaseLink: '',
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
    if (!data.purchaseLink.trim()) {
      obj.purchaseLink = 'Purchase link is required!'
    }
    if (!data.image.trim()) {
      obj.image = 'Image is required!'
    }

    return obj
  }

  const CreateBookAPI = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/books/create`
      const response = await axios.post(api, {
        ...formData,
        username: userdata.username,
        pathname,
      })
      if (response.status === 200) {
        const newBook = { _id: response.data.result._id, ...formData }
        setFormData(DefaultFormData)
        setBooks([...books, newBook])
        setMessage({
          type: true,
          message: 'Book created successfully!',
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
      CreateBookAPI()
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
      <form className="relative grid grid-cols-1 gap-3 min-w-[310px] max-w-[500px] bg-white shadow-xl rounded p-3 lg:p-5 mx-auto">
        <div
          className="absolute top-0 right-0 w-[20px] h-[20px] cursor-pointer hover:text-red-400 border hover:border-red-400 rounded-full m-2 flex items-center justify-center"
          onClick={() => setCreateForm(false)}
        >
          X
        </div>
        <h1 className="text-lg lg:text-xl font-semibold lg:font-bold mb-5 text-center">
          Create New Book
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
          <BlogEditor
            handleOnChange={handleOnChange}
            name="details"
            defaultValue={formData?.details}
          />
          {errorMessage?.details ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.details}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="purchaseLink">Purchase Link</label>
          <textarea
            type="text"
            name="purchaseLink"
            onChange={handleOnChange}
            id="purchaseLink"
            className="px-2 py-1 rounded-md hover:shadow-md"
            defaultValue={formData?.purchaseLink}
          />
          {errorMessage?.purchaseLink ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.purchaseLink}
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
          {errorMessage?.image ? (
            <span className="py-[4px] text-red-400">{errorMessage.image}</span>
          ) : null}
        </div>
        <div className="pt-5">
          <Button onClick={handleOnSubmit}>Create</Button>
        </div>
      </form>
    </div>
  )
}

const UpdateBook = ({ setUpdateForm, books, setBooks, setMessage, _id }) => {
  const { pathname } = useContext(PathContext)
  const { userdata } = useContext(UserContext)
  const { setLoading } = useContext(LoadingContext)
  const [formData, setFormData] = useState(
    books.filter((item) => item._id === _id)[0]
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
    if (!data.image.trim()) {
      obj.image = 'Image is required!'
    }

    return obj
  }

  const UpdateBookAPI = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/books/update`
      const payload = {
        ...formData,
        username: userdata.username,
        pathname,
      }
      const response = await axios.put(api, payload)
      if (response.status === 200) {
        const tempBookData = [...books]
        for (let i = 0; i < tempBookData.length; i++) {
          if (tempBookData[i]._id === _id) {
            tempBookData[i] = payload
            break
          }
        }
        setBooks(tempBookData)
        setMessage({
          type: true,
          message: 'Book updated successfully!',
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
      UpdateBookAPI()
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
      <form className="relative grid grid-cols-1 gap-3 min-w-[310px] max-w-[500px] bg-white shadow-xl rounded p-3 lg:p-5 mx-auto">
        <div
          className="absolute top-0 right-0 w-[20px] h-[20px] cursor-pointer hover:text-red-400 border hover:border-red-400 rounded-full m-2 flex items-center justify-center"
          onClick={() => setUpdateForm(false)}
        >
          X
        </div>
        <h1 className="text-lg lg:text-xl font-semibold lg:font-bold mb-5 text-center">
          Update Book
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
          <BlogEditor
            handleOnChange={handleOnChange}
            name="details"
            defaultValue={formData?.details}
          />
          {errorMessage?.details ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.details}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="purchaseLink">Purchase Link</label>
          <textarea
            type="text"
            name="purchaseLink"
            onChange={handleOnChange}
            id="purchaseLink"
            className="px-2 py-1 rounded-md hover:shadow-md"
            defaultValue={formData?.purchaseLink}
          />
          {errorMessage?.purchaseLink ? (
            <span className="py-[4px] text-red-400">
              {errorMessage.purchaseLink}
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
          {errorMessage?.image ? (
            <span className="py-[4px] text-red-400">{errorMessage.image}</span>
          ) : null}
        </div>
        <div className="pt-5">
          <Button onClick={handleOnSubmit}>Update</Button>
        </div>
      </form>
    </div>
  )
}
