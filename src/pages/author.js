import AboutPage from 'components/author/AboutPage'
import AuthorNav from 'components/author/AuthorNav'
import BlogsPage from 'components/author/BlogsPage'
import BooksPage from 'components/author/BooksPage'
import HomePage from 'components/author/HomePage'
import { useState } from 'react'

const Author = () => {
  const [currentTab, setCurrentTab] = useState('home')
  return (
    <>
      <AuthorNav name="James Clear" setCurrentTab={setCurrentTab} />
      {currentTab === 'home' ? (
        <HomePage />
      ) : currentTab === 'books' ? (
        <BooksPage />
      ) : currentTab === 'blogs' ? (
        <BlogsPage />
      ) : currentTab === 'about' ? (
        <AboutPage />
      ) : null}
    </>
  )
}

export default Author
