import ContextWrapper from 'context/ContextWrapper'
import Pop from './Pop'

const Layout = ({ children }) => {
  return (
    <ContextWrapper>
      <Pop>{children}</Pop>
    </ContextWrapper>
  )
}

export default Layout
