import Dashboard from '@/pages/dashboard'
import EditorPreview from 'components/editor/EditorPreview'

const MyPage = () => {
  return (
    <Dashboard>
      <div className="flex items-center justify-center mt-10">
        <EditorPreview />
      </div>
    </Dashboard>
  )
}

export default MyPage
