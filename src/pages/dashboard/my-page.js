import Dashboard from '@/pages/dashboard'
import EditorPreview from 'components/editor/EditorPreview'
import About from 'components/editor/mypage/About'
import Blogs from 'components/editor/mypage/Blogs'
import Contact from 'components/editor/mypage/Contact'
import { EditorContext } from 'context/EditorProvider'
import { useContext, useState } from 'react'

const MyPage = () => {
  const { editordata, setEditordata } = useContext(EditorContext)
  
  const tabs = ['Page', 'About', 'Blogs']
  const [tab, setTab] = useState('Page')
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
                    ? 'bg-[#0891B2] shadow-md text-white hover:bg-[#0891b290]'
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
          <About />
        ) : tab === 'Blogs' ? (
          <Blogs />
        ) : null}
      </div>
    </Dashboard>
  )
}

export default MyPage
