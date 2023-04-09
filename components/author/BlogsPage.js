import Link from "next/link"

const BlogsPage = () => {
    const Blogs =[
        {
            id: 1, 
            image: "https://img.freepik.com/free-vector/illustration-light-bulb-ideas_53876-20555.jpg",
            title: "For a More Creative Brain Follow These 5 Steps",
            description:"Anyone can learn to be creative by using these five steps. That's not to say being creative is easy. Uncovering your creative genius requires courage and tons of practice. However, this five-step approach should help demystify the creative process and illuminate the path to more innovative thinking.",
            detailsLink: ""
        },
        {
            id: 2, 
            image: "https://cdn.ghanaweb.com/imagelib/pics/479/47951446.jpg",
            title: "The Ultimate Productivity Hack is Saying No",
            description:"This page shares my best articles to read on topics like health, happiness, creativity, productivity and more. The central question that drives my work is, “How can we live better?” To answer that question, I like to write about science-based ways to solve practical problems.",
            detailsLink: ""
        }
    ]
  return (
    <div>
      <div className="px-auto py-16 bg-gray-100">
        <div className="w-full md:w-[80%] lg:w-[50%] mx-auto text-center">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center pb-10">
            Blogs
          </h1>
          <p>
            This page shares my best articles to read on topics like health,
            happiness, creativity, productivity and more. The central question
            that drives my work is, “How can we live better?” To answer that
            question, I like to write about science-based ways to solve
            practical problems.
          </p>
          <p>
            {"You'll"} find interesting articles to read on topics like how to
            stop procrastinating as well as personal recommendations like my
            list of the best books to read and my minimalist travel guide. Ready
            to dive in? You can use the categories below to browse my best
            articles.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 px-3 md:px-10 lg:px-24 2xl:px-32 pb-16">
        {Blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b py-10"
            >
              <div>
                <img
                  src={blog.image}
                  alt=""
                  className="max-h-[200px] mx-auto"
                />
              </div>
              <div className="grid grid-cols-1 gap-5">
                <h3 className="text-md md:text-lg lg:text-xl font-semibold">
                  {blog.title}
                </h3>
                <p>{blog.description}</p>
                <Link href={blog.detailsLink}>
                  <button className="bg-blue-600 text-white px-4 pt-1 pb-[7px] rounded-lg inline">
                    Learn more
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogsPage
