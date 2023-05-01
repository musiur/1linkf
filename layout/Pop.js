import { LoadingContext } from 'context/LoadingProvider'
import { PopContext } from 'context/PopProvider'
import Image from 'next/image'
import { useContext, useEffect } from 'react'

const Pop = ({ children }) => {
  const { message, setMessage } = useContext(PopContext)
  const { loading } = useContext(LoadingContext)

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])
  return (
    <div>
      {message ? (
        <span
          className={`${
            message.type ? 'bg-green-400' : 'bg-red-400'
          } text-white rounded-md px-6 font-semibold py-2 fixed top-[100px] right-0  m-5 shadow-xl`}
          style={{ zIndex: '999999' }}
        >
          {message.message}
        </span>
      ) : null}
      {loading ? (
        <div
          className="flex items-center justify-center fixed left-0 top-0 w-full h-[100vh]"
          style={{ zIndex: '99999999' }}
        >
          <Image
            src="/static/loading.svg"
            alt="Loading..."
            width={60}
            height={60}
            className="rounded-full shadow-xl border-4 border-white"
          />
        </div>
      ) : null}
      {children}
    </div>
  )
}

export default Pop
