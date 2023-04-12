/**
 * author: musiur alam opu
 * title: home page
 * description: link generator and subscription
 * flow: link generation (LinkChecker)
 */

import Button from 'components/Button'
import TickIcon from 'components/icons/TickIcon'
import LinkChecker from 'components/LinkChecker'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import faqItems from '../../data/home/faqItems.json'
import guideLine from '../../data/home/guideline.json'
import pricingData from '../../data/home/pricingData.json'
import NavFooter from 'layout/NavFooter'

// main function of this component
export default function Home() {
  // router
  const Router = useRouter()

  return (
    <NavFooter>
      <div className="bg-[#F9FAFB] max-w-[100vw] overflow-x-hidden">
      <div className="container section ">
        {/* hero section  */}
        <div className="home__hero">
          <div className="home__hero__searchfield">
            <h1 className="home__hero__s_heading">
              The <span className="home__hero__s_h__span">one link</span> your
              readers <br />
              will need to find <br />
              you and <span className="home__hero__s_h__span">your books</span>.
            </h1>

            {/* link creator component  */}
            <LinkChecker />
          </div>

          {/* right div  */}
          <div className="home__hero__image_section">
            <Image
              alt="card"
              src="https://1link.st/_next/image?url=%2Fiphone_mockup.png&w=640&q=75"
              width={750}
              height={1300}
              className="home__hero__i_s__image"
            />
          </div>
        </div>

        {/* gallary  */}
        <div id="discover" className="home__gallary">
          <h2 className="home__gallary__heading text-center">
            Showcase your books on a page with <br /> the
            <span className="home__hero__s_h__span"> colors and style</span> you
            want.
          </h2>
          <div className="flex items-start justify-between  min-w-[100vw] lg:min-w-[1500px] overflow-auto px-10 py-10">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              return (
                <div className="relative" key={i}>
                  <Image
                    alt="card"
                    src={`/images/gallary-${i}.webp`}
                    width={288}
                    height={500}
                    className={`rounded-xl min-w-[288px] min-h-[506px] hover:scale-[1.08] transition ease-in-out`}
                    style={{
                      marginLeft: `-${i * 10}px`,
                      marginTop: `${i * 15}px`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* guide section  */}
        <div id="how_it_works" className="home__hero">
          <div className="home__hero__searchfield">
            <h2 className="home__gallary__heading">
              {"You're"} just a few steps <br />
              away from your{' '}
              <span className="home__hero__s_h__span">1link</span>
            </h2>
            <ul>
              {guideLine.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex items-start justify-start gap-3 mb-4"
                  >
                    <div className="min-h-[30px] min-w-[30px] bg-[#0991b2] rounded-full text-white flex items-center justify-center">
                      {item.id + 1}
                    </div>
                    <div>
                      <h4 className="text-[16px] lg:text-[18px] font-bold text-gray-700">
                        {item.title}
                      </h4>
                      <p className="text-gray-400">{item.subtitle}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
            <LinkChecker />
          </div>
          <div className="home__hero__guide_image_section">
            <Image
              alt="card"
              src="https://1link.st/_next/image?url=%2Feditor-screenshot.png&w=1920&q=75"
              width={850}
              height={1300}
              className="home__hero__guide__image"
            />
          </div>
        </div>

        {/* pricing  */}
        <div id="pricing">
          <h2 className="home__gallary__heading text-center">
            Get a beautiful 1link for
            <br />
            your profile, at a{' '}
            <span className="home__hero__s_h__span">fair price.</span>
          </h2>
          <p className="text-[16px] md:text-[20px]  lg:text-[24px] text-gray-400 text-center">
            Basic features are free for your first book.
          </p>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-center pt-[80px]">
            {pricingData.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    `${
                      item.id === 1
                        ? 'scale-[1.08] z-10 border-2  border-[#0991b2]'
                        : 'z-0'
                    }` +
                    ' w-[380px] rounded-lg  px-5 py-8 relative bg-white shadow-xl'
                  }
                >
                  {item.id === 1 ? (
                    <div className="absolute top-0 right-0 w-full">
                      <p className="px-4 py-[3px] rounded-full bg-[#0991b2] text-white w-[120px] text-center mx-auto -mt-[16px]">
                        Launch deal
                      </p>
                    </div>
                  ) : null}
                  <h5 className="text-[24px] font-bold text-center">
                    {item.title}
                  </h5>
                  <p className="flex items-center justify-center gap-2">
                    {item.id === 1 ? (
                      <span className="text-[18px] font-bold text-gray-400">
                        {item.subheading[1]}
                      </span>
                    ) : null}
                    {item.id !== 2 ? (
                      <span className="text-[36px] font-bold text-gray-700">
                        {item.subheading[1]}
                      </span>
                    ) : null}
                    {item.id === 1 ? (
                      <span className="text-[18px] font-bold text-gray-400">
                        US/month
                      </span>
                    ) : null}
                    {item.id === 2 ? (
                      <span className="text-[18px] font-bold text-gray-600">
                        Contact us
                      </span>
                    ) : null}
                  </p>
                  <ul className="text-center py-4">
                    {item.list.map((item) => {
                      return <li key={item}>{item}</li>
                    })}
                  </ul>
                  <div className="flex justify-center">
                    {item.id === 1 ? (
                      <Button onClick={() => Router.push(item.btn_link)}>
                        {item.btn_text}
                      </Button>
                    ) : (
                      <button
                        onClick={() => Router.push(item.btn_link)}
                        type="white"
                        className="text-[#0991b2] bg-[#ECFEFF] hover:bg-[#CFFAFE] px-3 py-1 rounded-md"
                      >
                        {item.btn_text}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* faq  */}
        <div className="section" id="faq">
          <h2 className="home__gallary__heading text-center">
            Frequently asked questions
          </h2>
          <div className="max-w-[600px] mx-auto">
            {faqItems.map((item) => {
              return <FaqItem key={item.id} item={item} />
            })}
          </div>
        </div>
      </div>
    </div>
    </NavFooter>
  )
}

const FaqItem = ({ item }) => {
  const { title, description } = item
  const [openDesc, setOpenDesc] = useState(false)
  return (
    <div className="text-[14] lg:text-[18px] mb-5 flex items-start justify-start gap-3">
      <div>
        <TickIcon />
      </div>

      <div>
        <h5
          onClick={() => setOpenDesc(!openDesc)}
          className=" hover:text-[#0e7490] font-bold cursor-pointer"
        >
          {title}
        </h5>
        {openDesc ? <p>{description}</p> : null}
      </div>
    </div>
  )
}
