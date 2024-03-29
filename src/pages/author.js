import AboutPage from 'components/author/AboutPage'
import AuthorNav from 'components/author/AuthorNav'
import BlogPage from 'components/author/BlogPage'
import BlogsPage from 'components/author/BlogsPage'
import BooksPage from 'components/author/BooksPage'
import HomePage from 'components/author/HomePage'
import { useState } from 'react'

const Author = () => {
  const [currentTab, setCurrentTab] = useState('home')
  return (
    <div className="max-w-[1700px] mx-auto">
      <AuthorNav name="James Clear" setCurrentTab={setCurrentTab} />
      {currentTab === 'home' ? (
        <HomePage />
      ) : currentTab === 'books' ? (
        <BooksPage />
      ) : currentTab === 'blogs' ? (
        <BlogsPage setCurrentTab={setCurrentTab} />
      ) : currentTab === 'about' ? (
        <AboutPage />
      ) : currentTab === "blog" ? <BlogPage setCurrentTab={setCurrentTab}/> : null}
    </div>
  )
}

export default Author
