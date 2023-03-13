import { UserContext } from 'context/UserProvider'
import { useContext } from 'react'

const Blogs = () => {
  const { userdata } = useContext(UserContext)
  return <div className="container section">Blogs</div>
}

export default Blogs
