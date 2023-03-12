import { UserContext } from 'context/UserProvider'
import Private from 'layout/Private'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

const Dashboard = ({ children }) => {
  const { userdata } = useContext(UserContext)
  let tabs = ['Editor', 'Profile', 'My page']
  if (userdata?.roles?.includes('ROLE_ADMIN')) {
    tabs = ['Editor', 'Profile', 'My page', 'Manage users', 'Add moderator']
  }
  if (userdata?.roles?.includes('ROLE_MODERATOR')) {
    tabs = ['Editor', 'Profile', 'My page', 'Manage users']
  }
  const Router = useRouter()
  return (
    <Private>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-2 bg-[#0891B2] p-5 min-h-auto lg:min-h-[90vh] h-full flex flex-row flex-wrap lg:flex-col gap-1 justify-start items-start text-white">
          {tabs.map((item) => {
            const tab = item.replaceAll(' ', '-').toLowerCase()
            return (
              <Link
                href={`/dashboard/${tab}`}
                key={item}
                className={`w-auto lg:w-full text-center lg:text-left cursor-pointer px-3 py-1 rounded-md ${
                  Router.pathname.includes(tab)
                    ? 'bg-[#ffffff50] hover:bg-[#ffffff30]'
                    : 'hover:bg-[#ffffff20]'
                }`}
              >
                {item}
              </Link>
            )
          })}
        </div>
        <div className="col-span-10 min-w-[100vw] lg:min-w-[400px] overflow-x-auto bg-[#F1F2F3] min-h-[100vh]">
          {children}
        </div>
      </div>
    </Private>
  )
}

export default Dashboard
