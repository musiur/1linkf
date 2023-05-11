import Dashboard from '@/pages/dashboard'
// import AboutForm from 'components/editor/mypage/AboutForm'
import BlogsForm from 'components/editor/mypage/BlogsForm'
import BooksForm from 'components/editor/mypage/BooksForm'
import HomePageData from 'components/editor/mypage/HomePageData'
import { useState } from 'react'

const MyPage = () => {
  const tabs = ['Home', 'Books', 'Blogs']
  const [tab, setTab] = useState('Home')

  return (
    <Dashboard>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex items-center justify-center shadow rounded-md">
          {tabs.map((item) => {
            return (
              <div
                key={item}
                onClick={() => setTab(item)}
                className={`${
                  item === tab
                    ? 'bg-[#0891B2] shadow-md text-white hover:bg-gray-600'
                    : ''
                } px-3 py-1 rounded-md cursor-pointer hover:shadow-md hover:bg-gray-50`}
              >
                {item}
              </div>
            )
          })}
        </div>
        {
          tab === 'Blogs' ? (
            <BlogsForm />
          ) : tab === 'Home' ? (
            <HomePageData />
          ) : tab === 'Books' ? (
            <BooksForm />
          ) : null
        }
      </div>
    </Dashboard>
  )
}

export default MyPage
