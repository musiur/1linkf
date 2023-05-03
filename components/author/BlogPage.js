
import ParsedBlogDetails from './ParsedBlogDetails'

const BlogPage = ({ setCurrentTab, selectedBlog, pagedata }) => {
  const { title, username, image, details } = selectedBlog
  return (
    <div className="px-3 md:px-5 lg:px-16 xl:px-36 2xl:px-48">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 py-32 px-3 md:px-5 lg:px-10 xl:px-24 2xl:px-32 min-h-[90vh]">
      <div className="col-span-2">
        <div className="pb-10">
          <div
            onClick={() => setCurrentTab('blogs')}
            className="pb-10 cursor-pointer"
          >
            Go Back
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            {title}
          </h1>
          <p className="text-gray-400">written by {username}</p>
        </div>

        <div className="pb-10">
          <img src={image} alt="image" className="pb-10" />

          <ParsedBlogDetails data={details}/>
        </div>
      </div>
      <div className="col-span-1 pb-5 pl-5 border-l">
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold pb-5">
          {pagedata.authorTitle}
        </h4>
        <p className="pb-5">{pagedata.authorDescription}</p>
        <button onClick={() => setCurrentTab('about')}>
          Click here to learn more →
        </button>
      </div>
    </div>
    </div>
  )
}

export default BlogPage
