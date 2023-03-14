import axios from 'axios'
import { UserContext } from 'context/UserProvider'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const About = () => {
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
      <h2 className="text-xl font-bold text-center mb-10">About Author</h2>
      {userdata ? (
        <div>
          <p>{userdata.bio}</p>
        </div>
      ) : (
        'No data found!'
      )}
    </div>
  )
}

export default About
