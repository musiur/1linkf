

const AuthorNav = ({name, setCurrentTab}) => {
    const links = [
        {
            title: "Books",
            link: "books"
        },
        {
            title: "Blogs",
            link: "blogs"
        },
        {
            title: "About",
            link: "about"
        },
    ]
    return (
        <div className="flex items-center justify-between container sticky top-0 bg-white">
            <div className="text-xl lg:text-2xl font-medium cursor-pointer border-b border-white hover:border-black" onClick={() => setCurrentTab("home")}>{name}</div>
            <div className="flex items-center justify-between gap-5">
                {
                    links.map((item) => {
                        return (
                            <div key={item} onClick={() => setCurrentTab(item.link)} className="border-b border-white hover:border-black cursor-pointer">
                                {
                                    item.title
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AuthorNav;