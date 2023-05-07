const AboutPage = ({ pagedata }) => {
  return (
    <div className="px-auto py-16 bg-gray-100 min-h-[90vh]">
      <div className="container">
        {pagedata ? (
          <div className="w-full md:w-[80%] lg:w-[50%] mx-auto text-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center pb-10">
              Hi, {"I'm"} {pagedata.authorTitle}
            </h1>
            <p>{pagedata.authorDescription}</p>
          </div>
        ) : (
          'No data found!'
        )}
      </div>
    </div>
  )
}

export default AboutPage
