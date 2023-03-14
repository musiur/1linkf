import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import { UserContext } from 'context/UserProvider'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const BlogsForm = () => {
  const { userdata } = useContext(UserContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
  })
  const [errorMessage, setErrorMessage] = useState(formData)
  // api feedback handlers
  const [message, setMessage] = useState(null)
  const [spinner, setSpinner] = useState(false)

  const [blogs, setBlogs] = useState([])
  const [actions, setActions] = useState([0])
  const [action, setAction] = useState(0)

  useEffect(() => {
    console.log(action, 'adfasd')
    if (action !== 0 && blogs.length) {
      console.log('dukse')
      setFormData(blogs[action - 1])
    } else {
      setFormData({ title: '', description: '', link: '' })
    }
  }, [action, blogs])

  useEffect(() => {
    if (blogs.length) {
      let tempArr = []
      for (let i = 0; i < blogs.length + 1; i++) {
        tempArr.push(i)
      }
      setActions(tempArr)
    } else {
      setActions([0])
    }
  }, [blogs])

  // getting all blogs data
  const FetchUserData = async () => {
    try {
      const api = `${process.env.API_HOST}/api/author`
      const response = await axios.post(api, { username: userdata.username })
      console.log(response)
      if (response.status === 200) {
        setBlogs(response.data.data.blogs)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    FetchUserData()
  }, [])

  // handling form input
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

    if (!data.title.trim()) {
      err.title = 'Title is required!'
    }
    if (!data.description.trim()) {
      err.description = 'Description is required!'
    }
    if (!data.link.trim()) {
      err.link = 'Link is required!'
    }

    return err
  }

  const IDtoBeAdded = (blogs) => {
    let highestId = blogs[0].id
    if (blogs.length) {
      for (let i = 0; i < blogs.length; i++) {
        if (highestId < blogs[i].id) {
          highestId = blogs[i].id
        }
      }
    }

    console.log({ highestId })

    return highestId + 1
  }

  const AddNewBlogData = async () => {
    try {
      setSpinner(true)
      const api = `${process.env.API_HOST}/api/author/update`

      // api request
      let data = {}
      if (action == 0) {
        let tempBlog = [
          ...blogs,
          {
            id: IDtoBeAdded(blogs),
            link: formData.link,
            title: formData.title,
            description: formData.description,
          },
        ]
        setBlogs(tempBlog)
        data = {
          username: userdata.username,
          blogs: tempBlog,
        }
      } else {
        let tempBlog = [...blogs]
        tempBlog[action - 1].title = formData.title
        tempBlog[action - 1].description = formData.description
        tempBlog[action - 1].link = formData.link

        setBlogs(tempBlog)

        data = { username: userdata.username, blogs: tempBlog }
      }
      console.log('--->', { data })
      const response = await axios.put(api, data)

      console.log(response)
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Data updated successfully!',
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
      console.log(error)
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
      AddNewBlogData()
    } else {
      console.log(errorMessage)
    }
  }, [errorMessage])

  console.log(action)

  return (
    <div className="container section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div calssName="w-full">
          {blogs.length
            ? blogs.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-md my-2 bg-white shadow"
                  >
                    <p>ID: {item.id}</p>
                    <p>Title: {item.title}</p>
                    <p>Description: {item.description}</p>
                    <Link
                      href={item.link}
                      passHref={true}
                      className="text-blue-600"
                    >
                      Read now
                    </Link>
                  </div>
                )
              })
            : 'No blogs found! Add new'}
        </div>
        <div className="w-full p-5 rounded-md shadow-xl m-auto bg-white">
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
            Update your blogs data
          </h3>

          {/* sing in form  */}
          <form id="sign_up_form">
            <select
              value={action}
              className="border rounded-md px-3 py-1"
              onChange={(e) => {
                setAction(e.target.value)
              }}
            >
              {actions.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item === 0 ? 'Add new' : `Update blog no: ${item - 1}`}
                  </option>
                )
              })}
            </select>
            <label htmlFor="name" className="mt-3 border-t-2 pt-5">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              id="title"
              defaultValue={formData?.title}
            />
            {errorMessage?.title ? <span>{errorMessage.title}</span> : null}

            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleOnChange}
              id="description"
              defaultValue={formData?.description}
            />
            {errorMessage?.description ? (
              <span>{errorMessage.description}</span>
            ) : null}

            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="link"
              onChange={handleOnChange}
              id="link"
              defaultValue={formData?.link}
            />
            {errorMessage?.link ? <span>{errorMessage.link}</span> : null}

            {/* submit button  */}
            <Button onClick={handleOnSubmit} disable={spinner}>
              {spinner ? <Spinner /> : null}
              {spinner ? 'Updating' : 'Update blog'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogsForm
