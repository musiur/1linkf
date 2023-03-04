import Dashboard from '@/pages/dashboard'
import EditorPreview from 'components/editor/EditorPreview'
import { EditorContext } from 'context/EditorProvider'
import { useContext } from 'react'

const MyPage = () => {
  const { editordata, setEditordata } = useContext(EditorContext)
  console.log(editordata)
  return (
    <Dashboard>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="py-10">
          My Link: 
          <a
            href={`https://1linkf.vercel.app/` + editordata.headers.url}
            target="_blank"
            className="text-blue-600 px-3"
          >Visit</a>
        </div>
        <EditorPreview />
      </div>
    </Dashboard>
  )
}

export default MyPage
