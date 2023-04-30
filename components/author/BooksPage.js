import Link from 'next/link'

const BooksPage = () => {
  const Books = [
    {
      id: 1,
      title:
        'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      subTitle: 'The instant New York Times best-seller!',
      shortDescription:
        "My first book, Atomic Habits, offers a proven framework for getting 1 percent better every day. It's the ultimate guide on how to design a system where good habits emerge naturally and unwanted habits fade away.",
      image:
        'https://jamesclear.com/wp-content/uploads/2022/12/retina-atomic-habits-full.png',
      detailsLink: '/',
    },
    {
      id: 2,
      title: 'The Clear Habit Journal',
      subTitle:
        'Finally, a journal that makes it easy to build habits that last.',
      shortDescription:
        'The Clear Habit Journal is a combination daily journal, dot grid notebook, and habit tracker. It delivers the structure you need to get the daily tasks done quickly and the flexibility you want to handle whatever else life throws at you.',
      image:
        'https://jamesclear.com/wp-content/uploads/2020/11/clear-habit-journal2x-1.png',
      detailsLink: '/',
    },
  ]
  return (
    <div>
      <div className="px-2 md:px-5 lg:px-10 py-24 bg-gray-100">
        <div className="w-full md:w-[80%] lg:w-[50%] text-center mx-auto">
          <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-bold mb-10">
            Books
          </h1>
          <p>
            You can think of my weekly articles as the place where I share
            incremental lessons on how to build habits that stick and live
            better. I share the lessons I learn week-by-week in my stories and
            articles. Meanwhile, my books are where I share more comprehensive
            analysis on these topics.
          </p>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-10">
          All Books
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-10 px-3 md:px-10 lg:px-24 2xl:px-32 pb-16">
        {Books.map((book) => {
          return (
            <div
              key={book.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b py-10"
            >
              <div>
                <img
                  src={book.image}
                  alt=""
                  className="max-h-[300px] mx-auto"
                />
              </div>
              <div className="grid grid-cols-1 gap-5">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                  {book.title}
                </h2>
                <h3 className="text-md md:text-lg lg:text-xl font-semibold">
                  {book.subTitle}
                </h3>
                <p>{book.shortDescription}</p>
                <Link href={book.detailsLink}>
                  <button className="bg-blue-600 text-white px-4 pt-1 pb-[7px] rounded-lg inline">
                    Details
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

export default BooksPage
