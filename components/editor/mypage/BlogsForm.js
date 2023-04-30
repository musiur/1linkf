import axios from 'axios'
import { useEffect, useState } from 'react'

const BlogsForm = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const FetchBlogs = async () => {
    try {
      const api = `${process.env.API_HOST}/api/blogs/all`
      const response = await axios.get(api)
      console.log(response)
      if (response.status === 200) {
        setBlogs(response.data.result)
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    } catch (error) {
      console.log(error)
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
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
          } text-white rounded-md px-4 py-1`}
        >
          {message.message}
        </span>
      ) : null}
      {blogs.length ? (
        blogs.map((item) => {
          return <div key={item._id}>blog</div>
        })
      ) : (
        <div>No blog found!</div>
      )}
    </div>
  )
}

export default BlogsForm
