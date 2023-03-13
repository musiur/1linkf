import { UserContext } from 'context/UserProvider'
import { useContext } from 'react'

const About = () => {
  const { userdata } = useContext(UserContext)
  return <div className="container section">About</div>
}

export default About
