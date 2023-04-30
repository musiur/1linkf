import ContextWrapper from 'context/ContextWrapper'

const Layout = ({ children }) => {
  return <ContextWrapper>{children}</ContextWrapper>
}

export default Layout
