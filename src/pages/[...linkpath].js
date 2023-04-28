import { useRouter } from 'next/router'
import AboutPage from 'components/author/AboutPage'
import AuthorNav from 'components/author/AuthorNav'
import BlogPage from 'components/author/BlogPage'
import BlogsPage from 'components/author/BlogsPage'
import BooksPage from 'components/author/BooksPage'
import HomePage from 'components/author/HomePage'
import { useState } from 'react'

const LinkPath = () => {
  const Router = useRouter()
  const linkpath = Router.query.linkpath
  const [currentTab, setCurrentTab] = useState('home')
  return (
    <div>
      <AuthorNav name={linkpath ? linkpath : "John Doe"} setCurrentTab={setCurrentTab} />
      {currentTab === 'home' ? (
        <HomePage linkpath={linkpath} />
      ) : currentTab === 'books' ? (
        <BooksPage />
      ) : currentTab === 'blogs' ? (
        <BlogsPage setCurrentTab={setCurrentTab} />
      ) : currentTab === 'about' ? (
        <AboutPage />
      ) : currentTab === 'blog' ? (
        <BlogPage setCurrentTab={setCurrentTab} />
      ) : null}
    </div>
  )
}

export default LinkPath
