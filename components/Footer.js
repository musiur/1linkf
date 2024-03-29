import Link from 'next/link'

const Footer = () => {
  return (
    <div className="section text-white bg-[#0891B2]">
      <div className="container">
        <Link href="/">
          <h4 className="text-[24px] leading-[32px] mb-5">1link</h4>
        </Link>
        <p>
          Inspired by Creativindie
          <br />
          Need help with your book launch?
          <br />
          Grab our free guide to book marketing
        </p>
      </div>
    </div>
  )
}

export default Footer
