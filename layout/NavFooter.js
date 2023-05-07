import { useRouter } from 'next/router'

const { default: Footer } = require('components/Footer')
const { default: Navbar } = require('components/Navbar')

const NavFooter = ({ children }) => {
  const Router = useRouter()

  return (
    <>
      <Navbar />
      {children}
      {!Router.pathname.includes('dashboard') ? <Footer /> : null}
    </>
  )
}

export default NavFooter
