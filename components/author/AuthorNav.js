import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { LoadingContext } from 'context/LoadingProvider'
import { PopContext } from 'context/PopProvider'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
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
  const { setLoading } = useContext(LoadingContext)
  const { setMessage } = useContext(PopContext)
  const [openMobileNav, setOpenMobileNav] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(true)
  const [subscription, setSubscription] = useState(false)
  const [emailContainer, setEmailContainer] = useState({})
  const [email, setEmail] = useState('')
  const [resources, setResources] = useState({
    file: '',
  })

  const GetGiveway = async () => {
    setLoading(true)
    try {
      const API = `${process.env.API_HOST}/api/giveway/${Router.query.linkpath[0]}`
      const response = await axios.get(API)
      console.log(response)
      if (response.status === 200) {
        const fileFromDB = response.data.result[0]
        setMessage({
          type: true,
          message: 'Giveway data fetch successful!',
        })
        setResources({ file: fileFromDB.file, extension: fileFromDB.extension })
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 404) {
        setMessage({
          type: false,
          message: 'No data found! Create now!',
        })
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    }
    setLoading(false)
  }

  const CheckNewsletterEmails = async () => {
    setLoading(true)
    try {
      const API = `${process.env.API_HOST}/api/newsletters/${Router.query.linkpath[0]}`
      const response = await axios.get(API)
      console.log(response)
      if (response.status === 200) {
        setEmailContainer(response.data.result[0])
      }
    } catch (error) {
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    Router.query.linkpath && CheckNewsletterEmails()
    Router.query.linkpath && GetGiveway()
  }, [Router])

  const AddNewslettersEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const API = `${process.env.API_HOST}/api/newsletters/update`
      const data = {
        username: emailContainer.username,
        pathname: Router.query.linkpath[0],
        email,
      }
      console.log({ data })
      const response = await axios.put(API, data)
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Thank you for your subscription',
        })
      }
      setSubscription(true)
    } catch (error) {
      console.log(error)
      if (error.response.status === 409) {
        setMessage({
          type: true,
          message: 'Already subscribed!',
        })
        setSubscription(true)
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    }
    setLoading(false)
  }

  return (
    <div
      className="sticky top-0 bg-white shadow-xl"
      style={{ zIndex: '9999999' }}
    >
      {showNewsletter ? (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-[#00000070] z-50 overflow-scroll">
          <div className="min-w-[300px] w-[600px] min-h-[200px] bg-white rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 gap-2 mx-2 py-5 relative">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-400 hover:text-red-400 text-xl cursor-pointer absolute top-0 right-0 m-2"
              onClick={() => setShowNewsletter(false)}
            />

            {subscription ? (
              <>
                {resources.file ? (
                  <div className="p-3 rounded-md border border-gray-200 grid grid-cols-1 gap-2 mt-10 col-span-2">
                    <p className="text-gray-400">
                      You can download your giveway file from here
                    </p>
                    <a
                      href={resources.file}
                      download={`Give-resouces${resources.extension}`}
                      target="_blank"
                    >
                      <button className="px-5 py-1 rounded-md bg-white text-gray-800 hover:shadow-xl border border-[#0891b2] font-semibold w-full">
                        Download the resource
                      </button>
                    </a>
                  </div>
                ) : (
                  <div className="text-center col-span-2 my-auto">
                    <p className="text-xl font-bold text-red-400">
                      Sorry, there is no free resources found!
                    </p>
                    <p className="text-gray-400">
                      If author will uploads any resources, then newsletter will
                      be sent to you.
                    </p>
                  </div>
                )}
              </>
            ) : null}

            {!subscription ? (
              <img
                src={
                  'https://static.vecteezy.com/system/resources/previews/007/104/554/original/one-new-email-message-with-smartphone-screen-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg'
                }
                alt="newsletter"
              />
            ) : null}

            {!subscription ? (
              <div className="my-auto grid grid-cols-1 gap-3">
                <h1 className="text-xl font-bold">
                  Subscribe to our newsletters!
                </h1>
                <p className="text-gray-400">
                  Subscribe to our newsletter for updates and get{' '}
                  <span className="text-lg text-black bg-yellow-400 font-semibold px-2">
                    free resources
                  </span>
                </p>
                <form className="grid grid-cols-1 gap-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-md p-2"
                    placeholder="Your email address"
                    type="email"
                    required={true}
                  />
                  <button
                    className="p-2 bg-blue-400 hover:bg-blue-600 text-white rounded-md w-full"
                    onClick={AddNewslettersEmail}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

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
