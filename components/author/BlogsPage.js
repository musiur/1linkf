const BlogsPage = ({ blogs, setCurrentTab, setSelectedBlog }) => {
  return (
    <div className="min-h-[90vh]">
      <div className="px-auto py-16 bg-gray-100 ">
        <div className="w-full md:w-[80%] lg:w-[50%] mx-auto text-center">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center pb-10">
            Blogs
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 section container">
        {blogs.length
          ? [...blogs].reverse().map((item) => {
              return (
                <div
                  key={item._id}
                  className="shadow-md rounded-lg border hover:shadow-xl bg-white"
                >
                  <img src={item.image} alt="" className="rounded-t-lg" />
                  <div className="p-3 lg:p-5">
                    <div className="grid grid-cols-1 gap-3 pb-5">
                      <h2
                        className="font-bold text-md lg:text-lg hover:underline cursor-pointer"
                        onClick={() => {
                          setSelectedBlog(item)
                          setCurrentTab('blog')
                        }}
                      >
                        {item.title}
                      </h2>
                      <h4 className="font-semibold text-gray-600">
                        {item.subTitle}
                      </h4>
                      <p className="text-gray-400">
                        {item.shortDescription.slice(0, 200)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          : <div className="text-center my-5">No Blogs Found!</div>}
      </div>
    </div>
  )
}

export default BlogsPage
