import Dashboard from '@/pages/dashboard'
import axios from 'axios'
import EditorPreview from 'components/editor/EditorPreview'
import AboutForm from 'components/editor/mypage/AboutForm'
import BlogsForm from 'components/editor/mypage/BlogsForm'
import { EditorContext } from 'context/EditorProvider'
import { UserContext } from 'context/UserProvider'
import { useContext, useState } from 'react'

const MyPage = () => {
  // const { userdata } = useContext(UserContext)
  const { editordata } = useContext(EditorContext)

  const tabs = ['Page', 'About', 'Blogs']
  const [tab, setTab] = useState('Page')

  // const MakeAuthorProfile = async () => {
  //   try {
  //     const api = `${process.env.API_HOST}/api/author/create`
  //     const data = {
  //       username: userdata.username,
  //       bio: 'Bio of ' + userdata.username,
  //       blogs: [
  //         {
  //           id: 0,
  //           title: 'Test Blog',
  //           description: 'This blog is nothing to do',
  //           link: 'https://youtube.com',
  //         },
  //       ],
  //     }
  //     const response = await axios.post(api, data)
  //     console.log(response)
  //   } catch (error) {
  //     console.log('Error')
  //   }
  // }
  // useEffect(() => {
  //   if (userdata) {
  //   }
  // }, [userdata])
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
        {tab === 'Page' ? (
          <div>
            <div className="py-10">
              My Link:
              <a
                href={`https://1linkf.vercel.app/` + editordata.headers.url}
                target="_blank"
                className="text-blue-600 px-3"
              >
                Visit
              </a>
            </div>
            <EditorPreview />
          </div>
        ) : tab === 'About' ? (
          <AboutForm />
        ) : tab === 'Blogs' ? (
          <BlogsForm />
        ) : null}
      </div>
    </Dashboard>
  )
}

export default MyPage
