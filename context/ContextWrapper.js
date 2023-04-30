import EditorProvider from './EditorProvider'
import LoadingProvider from './LoadingProvider'
import PathProvider from './PathContext'
import UserProvider from './UserProvider'

const ContextWrapper = ({ children }) => {
  return (
    <UserProvider>
      <PathProvider>
        <EditorProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </EditorProvider>
      </PathProvider>
    </UserProvider>
  )
}

export default ContextWrapper
