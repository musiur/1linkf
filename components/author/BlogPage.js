const BlogPage = ({setCurrentTab}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 py-32 px-3 md:px-5 lg:px-10 xl:px-24 2xl:px-32">
      <div className="col-span-2">
        <div className="pb-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            For a More Creative Brain Follow These 5 Steps
          </h1>
          <p className="text-gray-400">written by James Clear</p>
        </div>

        <div>
          <img
            src="https://img.freepik.com/free-vector/illustration-light-bulb-ideas_53876-20555.jpg"
            alt=""
          />
          <p className="py-5">
            Nearly all great ideas follow a similar creative process and this
            article explains how this process works. Understanding this is
            important because creative thinking is one of the most useful skills
            you can possess. Nearly every problem you face in work and in life
            can benefit from innovative solutions, lateral thinking, and
            creative ideas.
          </p>
          <p className="py-5">
            Anyone can learn to be creative by using these five steps. Thats not
            to say being creative is easy. Uncovering your creative genius
            requires courage and tons of practice. However, this five-step
            approach should help demystify the creative process and illuminate
            the path to more innovative thinking.
          </p>

          <p className="py-5">
            For example, if a newspaper wanted to print an image in the 1870s,
            they had to commission an engraver to etch a copy of the photograph
            onto a steel plate by hand. These plates were used to press the
            image onto the page, but they often broke after just a few uses.
            This process of photoengraving, you can imagine, was remarkably time
            consuming and expensive.
          </p>
        </div>
      </div>
      <div className="col-span-1 pb-5 pl-5 border-l">
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold pb-5">
          About the Author{' '}
        </h4>
        <p className="pb-5">
          James Clear writes about habits, decision making, and continuous
          improvement. He is the author of the #1 New York Times bestseller,
          Atomic Habits. The book has sold over 10 million copies worldwide and
          has been translated into more than 50 languages.
        </p>
        <button onClick={() => setCurrentTab("about")}>
          Click here to learn more →
        </button>
      </div>
    </div>
  )
}

export default BlogPage
