import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = ({ linkpath }) => {
  const [pageload, setPageload] = useState('loading')
  const blogs = [
    {
      id: 0,
      title: "Why Facts Don't Change Our Minds",
    },
    {
      id: 1,
      title: 'Forget About Setting Goals. Focus on This Instead.',
    },
    {
      id: 2,
      title: 'The Ultimate Productivity Hack is Saying No',
    },
  ]

  const [pagedata, setPagedata] = useState(null)

  const fetchFormData = async () => {
    try {
      setPageload('loading')
      const api = `${process.env.API_HOST}/api/authorpage/${linkpath}`
      const response = await axios.get(api)
      console.log(response)
      if (response.status === 200) {
        if (response.data.result.length) {
          setPageload(false)
          setPagedata(response.data.result[0])
        } else {
          setPageload('notfound')
        }
      } else {
        setPageload('notfound')
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchFormData()
  }, [linkpath])

  console.log('--->', pagedata)

  return pageload !== 'loading' ? (
    pagedata ? (
      <div>
        {/* hero section */}
        <div className="flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-gray-100 to-white py-36 px-3">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold w-full md:w-[80%] lg:w-[50%] text-center">
            {pagedata.title
              ? pagedata.title
              : 'An Easy & Proven Way to Build Good Habits & Break Bad Ones'}
          </h1>
          <p className="w-full md:w-[80%] lg:w-[50%] text-center">
            {pagedata.description
              ? pagedata.description
              : 'Packed with self-improvement strategies, Atomic Habits will teach you how to make the small changes that will transform your habits and deliver remarkable results.'}
          </p>
          <img
            src={
              pagedata.image
                ? pagedata.image
                : 'https://jamesclear.com/wp-content/uploads/2022/12/retina-atomic-habits-full-dots.png'
            }
            alt="img"
            className="w-full p-5 md:w-[80%] lg:w-[50%] mx-auto max-h-[600px]"
          />
        </div>

        {/* author and blogs section  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-3 md:px-5 xl:px-32">
          <div className="px-3 md:px-5 lg:px-12 flex flex-col gap-4">
            <h1 className="text-xl lg:text-3xl font-bold">
              {pagedata.authorTitle
                ? pagedata.authorTitle
                : "Hi, I'm James Clear"}
            </h1>

            <p>
              {pagedata.authorDescription
                ? pagedata.authorDescription
                : "I'm the author of the #1 New York Times bestseller, Atomic Habits, which has sold more than 10 million copies worldwide. My work has been featured in places like Time magazine, the New York Times, the Wall Street Journal and on CBS This Morning. Click here to learn more about me and my work."}
            </p>
          </div>
          <div className="flex flex-col gap-3 px-3 md:px-5 xl:px-32">
            <h3 className="text-xl lg:text-2xl font-semibold">Popular Blogs</h3>
            {blogs.map((item) => {
              return (
                <p
                  key={item.id}
                  className="cursor-pointer text-black hover:text-blue-400 hover:underline flex items-start justify-start gap-3"
                >
                  <FontAwesomeIcon icon={faCheck} className="mt-[6px]" />
                  {item.title}
                </p>
              )
            })}
          </div>
        </div>
        <div className="py-10"></div>
      </div>
    ) : (
      <div className="container section text-center">No data found!</div>
    )
  ) : pageload === 'notfound' ? (
    <div className="container section text-center">No data found!</div>
  ) : (
    <div className="container section text-center">Loading...</div>
  )
}

export default HomePage
