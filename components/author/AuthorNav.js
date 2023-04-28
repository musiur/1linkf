import { useRouter } from 'next/router'

const AuthorNav = ({ name, setCurrentTab }) => {
  const Router = useRouter()
  const links = [
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
  return (
    <div className="sticky top-0 bg-white">
      <div className="container flex items-center justify-between">
        <div
          className="text-xl lg:text-2xl font-medium cursor-pointer border-b border-white hover:border-black"
          onClick={() => setCurrentTab('home')}
        >
          {name}
        </div>
        <div className="flex items-center justify-between gap-5">
          {links.map((item) => {
            return (
              <div
                key={item}
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
      </div>
    </div>
  )
}

export default AuthorNav
