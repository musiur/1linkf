import { useRouter } from 'next/router'
import { useContext } from 'react'
import { LoadingContext } from 'context/LoadingProvider'
import Image from 'next/image'

const { default: Footer } = require('components/Footer')
const { default: Navbar } = require('components/Navbar')

const NavFooter = ({ children }) => {
  const Router = useRouter()
  const { loading } = useContext(LoadingContext)

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center fixed left-0 top-0 w-full h-[100vh]" style={{zIndex: "99999999"}}>
          <Image
            src="/static/loading.svg"
            alt="Loading..."
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      ) : null}
      {children}
      {!Router.pathname.includes('dashboard') ? <Footer /> : null}
    </>
  )
}

export default NavFooter
