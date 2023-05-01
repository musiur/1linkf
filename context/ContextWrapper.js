import EditorProvider from './EditorProvider'
import LoadingProvider from './LoadingProvider'
import PathProvider from './PathProvider'
import PopProvider from './PopProvider'
import UserProvider from './UserProvider'

const ContextWrapper = ({ children }) => {
  return (
    <UserProvider>
      <PathProvider>
        <EditorProvider>
          <PopProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </PopProvider>
        </EditorProvider>
      </PathProvider>
    </UserProvider>
  )
}

export default ContextWrapper
