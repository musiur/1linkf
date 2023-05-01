import { useRouter } from 'next/router'
import AboutPage from 'components/author/AboutPage'
import AuthorNav from 'components/author/AuthorNav'
import BlogPage from 'components/author/BlogPage'
import BlogsPage from 'components/author/BlogsPage'
import BooksPage from 'components/author/BooksPage'
import HomePage from 'components/author/HomePage'
import { useContext, useEffect, useState } from 'react'
import Footer from 'components/Footer'
import { UserContext } from 'context/UserProvider'
import { LoadingContext } from 'context/LoadingProvider'
import { PopContext } from 'context/PopProvider'
import axios from 'axios'

const LinkPath = () => {
  const Router = useRouter()
  const linkpath = Router.query.linkpath
  const [currentTab, setCurrentTab] = useState('home')
  const { setUserdata } = useContext(UserContext)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const { setLoading } = useContext(LoadingContext)
  const { setMessage } = useContext(PopContext)
  const [pagedata, setPagedata] = useState(null)

  const fetchFormData = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/authorpage/${linkpath[0]}`
      const response = await axios.get(api)
      if (response.status === 200) {
        if (response.data.result.length) {
          setPagedata(response.data.result[0])
        } else {
          setMessage({
            type: false,
            message: 'No data found!',
          })
        }
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    } catch (err) {
      console.log(err)
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    linkpath && fetchFormData()
  }, [linkpath])

  // blogs data
  const [blogs, setBlogs] = useState([])
  const pathname = linkpath

  const FetchBlogs = async () => {
    setLoading(true)
    try {
      const api = `${process.env.API_HOST}/api/blogs/${pathname[0]}`
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
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    pagedata && FetchBlogs()
  }, [pagedata])

  const SignOut = () => {
    setUserdata({})
    sessionStorage.clear()
    localStorage.clear()
  }

  useEffect(() => {
    SignOut()
  }, [])

  return (
    <div>
      <AuthorNav
        name={linkpath ? linkpath : 'John Doe'}
        setCurrentTab={setCurrentTab}
      />
      {currentTab === 'home' ? (
        <HomePage
          pagedata={pagedata}
          blogs={blogs.slice(0, 5)}
          setSelectedBlog={setSelectedBlog}
          setCurrentTab={setCurrentTab}
        />
      ) : currentTab === 'books' ? (
        <BooksPage />
      ) : currentTab === 'blogs' ? (
        <BlogsPage
          blogs={blogs}
          setCurrentTab={setCurrentTab}
          setSelectedBlog={setSelectedBlog}
        />
      ) : currentTab === 'about' ? (
        <AboutPage pagedata={pagedata} />
      ) : currentTab === 'blog' ? (
        <BlogPage
          setCurrentTab={setCurrentTab}
          selectedBlog={selectedBlog}
          pagedata={pagedata}
        />
      ) : null}
      <Footer />
    </div>
  )
}

export default LinkPath
