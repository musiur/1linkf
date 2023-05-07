import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useState } from 'react'
const links = [
  {
    title: 'My Card',
    link: 'card',
  },
  {
    title: 'Books',
    link: 'books',
  },
  {
    title: 'Blogs',
    link: 'blogs',
  },
  {
    title: 'About',
    link: 'about',
  },
  {
    title: '1link',
    link: '/',
  },
]
const AuthorNav = ({ name, setCurrentTab }) => {
  const Router = useRouter()
  const [openMobileNav, setOpenMobileNav] = useState(false)

  return (
    <div className="sticky top-0 bg-white shadow-xl" style={{zIndex: "9999999"}}>
      <div
        className={`block md:hidden fixed top-0 right-0 h-[100vh] w-full overflow-y-scroll transition ease-in-out delay-150 overflow-x-hidden bg-white p-5 ${
          openMobileNav ? 'translate-x-[0]' : 'translate-x-[100%]'
        }`}
        onClick={() => setOpenMobileNav(false)}
      >
        <div className="text-end">
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {links.map((item) => {
            return (
              <div
                key={item.title}
                onClick={() => {
                  if (item.title === '1link') {
                    Router.push('/')
                  } else {
                    setCurrentTab(item.link)
                  }
                }}
                className="border-b border-white"
              >
                {item.title}
              </div>
            )
          })}
        </div>
      </div>
      <div className="container flex items-center justify-between">
        <div
          className="text-xl lg:text-2xl font-medium cursor-pointer border-b border-white hover:border-black"
          onClick={() => setCurrentTab('home')}
        >
          {name}
        </div>
        <div className="hidden md:flex items-center justify-between gap-5">
          {links.map((item) => {
            return (
              <div
                key={item.title}
                onClick={() => {
                  if (item.title === '1link') {
                    Router.push('/')
                  } else {
                    setCurrentTab(item.link)
                  }
                }}
                className="border-b border-white hover:border-black cursor-pointer"
              >
                {item.title}
              </div>
            )
          })}
        </div>
        <FontAwesomeIcon
          icon={faHamburger}
          className="block md:hidden"
          onClick={() => setOpenMobileNav(true)}
        />
      </div>
    </div>
  )
}

export default AuthorNav
