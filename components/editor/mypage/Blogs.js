import axios from 'axios'
import { UserContext } from 'context/UserProvider'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const Blogs = () => {
  const [userdata, setUserdata] = useState(null)
  const Router = useRouter()

  const FetchUserData = async () => {
    try {
      console.log({ username: Router.query.linkpath })
      const api = `${process.env.API_HOST}/api/author`
      console.log({ username: Router.query.linkpath })
      const response = await axios.post(api, {
        username: Router.query.linkpath,
      })
      console.log({ response })
      if (response.status === 200) {
        setUserdata(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    FetchUserData()
  }, [])

  console.log(userdata)
  return (
    <div className="container section">
      <h2 className="text-xl font-bold text-center mb-10">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {userdata
          ? userdata.blogs.map((item) => {
              const { title, description, link } = item
              return (
                <div key={item.id} className="p-3 rounded-lg bg-white shadow-lg hover:shadow-xl border">
                  <h4 className="font-bold mb-3">{title}</h4>
                  <div className="text-gray-400">{description}</div>
                  <Link href={link} passHref={true} target="_blank">
                    Read now
                  </Link>
                </div>
              )
            })
          : "No blog found!"}
      </div>
    </div>
  )
}

export default Blogs
