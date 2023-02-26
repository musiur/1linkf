

import Button from 'components/Button'
import Image from 'next/image'
import { useState } from 'react';


export default function Home() {

  const onChangeHandler = (e) => {
    console.log(e.target.value);
  }
  const faqItems = [
    {
      id: "0",
      title: "How is 1link better than Linktree?",
      description: "With 1link, you can showcase what is the most important for your readers: your books. Linktree is designed for as many people as possible, whereas 1link is specifically designed for authors who want to showcase their books."
    },
    {
      id: "1",
      title: "Is 1link free to use?",
      description: "Yes, you can get a 1link page for free and showcase one book. You'll have access to all customization features."
    },
    {
      id: "2",
      title: "Can I customize colors with a free 1link account?",
      description: "Yes, you can choose any color your want for your page background and for the buttons."
    },
    {
      id: "3",
      title: "What does the Premium subscription offer?",
      description: "With a Premium subscription, you can showcase more than one book, and add a banner picture to your profile. If you want to, you can also remove the 1link logo from your page's footer."
    },
    {
      id: "4",
      title: "Can I cancel my Premium subscription anytime?",
      description: "Yes! In your account settings, you can cancel your Premium subscription. You'll continue benefiting from Premium features until the end of billing period."
    },
    {
      id: "5",
      title: "I purchases the Premium subscription and I'm not satisfied…",
      description: "If you cancel your subscription during the first month, just send us an email and we will refund the first month."
    },
    {
      id: "6",
      title: "I have another question…",
      description: "Contact us by email or find us on Twitter!"
    },
  ]

  const guideLine = [
    {
      id: 0,
      title: "Create your account for free",
      subtitle: "Access all features right now."
    },
    {
      id: 1,
      title: "Add your books and your links",
      subtitle: "Don't forget the links to your social media."
    },
    {
      id: 2,
      title: "Customize colors and style",
      subtitle: "Your readers will see a page that looks like you!"
    },
    {
      id: 3,
      title: "Share your 1link everywhere!",
      subtitle: "On Twitter, Instagram, TikTok, and why not in your books?"
    },
  ]

  const pricingData = [
    {
      id: 0,
      title: "Free",
      subheading: [0, "$0.00"],
      list: [
        "Customize colors and style",
        "Showcase one book",
        "Unlimited links"
      ],
      btn_text: "Sign up for free"
    },
    {
      id: 1,
      title: "Premium",
      subheading: ["$6.99", "$3.99", "US/month"],
      list: [
        "Customize colors and style",
        "Showcase unlimited books",
        "Add a banner picture",
        "Unlimited links",
        "Remove 1link icon"
      ],
      btn_text: "Sign up with premium features"
    },
    {
      id: 2,
      title: "Professional",
      subheading: "Contuct us",
      list: [
        "Want to create pages for your clients?",
        "Get in touch for a custom solution."
      ],
      btn_text: "contact us"
    },
  ]
  return (
    <div className="bg-[#F9FAFB] max-w-[100vw] overflow-x-hidden">
      <div className="container section ">
        <div className="home__hero">
          <div className="home__hero__searchfield">
            <h1 className="home__hero__s_heading">The <span className="home__hero__s_h__span">one link</span> your readers <br />
              will need to find <br />
              you and <span className="home__hero__s_h__span">your books</span>.</h1>
            <div className="home__hero__s_input_field">
              <input type="text" name="checkAvailability" defaultValue="1link.st/" className="home__hero_s_i_f__input_box" onChange={onChangeHandler} placeholder="1link.st/" />
              <button className="home__hero_s_i_f__search_button hover:bg-[#06B6D4]">Create my 1link</button>
            </div>
          </div>
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
          <h2 className="home__gallary__heading text-center">Showcase your books on a page with <br /> the<span className="home__hero__s_h__span"> colors and style</span> you want.</h2>
          <div className="flex items-start justify-between">
            {
              [1, 2, 3, 4, 5, 6].map((i) => {
                return (
                  <div key={i} className="relative">
                    <Image
                      alt="card"
                      src={`/images/gallary-${i}.webp`}
                      width={288}
                      height={500}
                      className={`rounded-xl min-w-[288px] min-h-[506px] hover:scale-[1.08] transition ease-in-out`}
                      style={{ marginLeft: `-${i * 10}px`, marginTop: `${i * 15}px` }}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* guide section  */}
        <div id="how_it_works" className="home__hero">
          <div className="home__hero__searchfield">
            <h2 className="home__gallary__heading">{"You're"} just a few steps <br />
              away from your  <span className="home__hero__s_h__span">1link</span></h2>
            <ul>
              {
                guideLine.map((item) => {
                  return (
                    <li key={item.id} className="flex items-start justify-start gap-3 mb-4">
                      <div className="min-h-[30px] min-w-[30px] bg-[#0991b2] rounded-full text-white flex items-center justify-center">{item.id + 1}</div>
                      <div>
                        <h4 className="text-[16px] lg:text-[18px] font-bold text-gray-700">{item.title}</h4>
                        <p className="text-gray-400">{item.subtitle}</p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <div className="home__hero__s_input_field">
              <input type="text" name="checkAvailability" defaultValue="1link.st/" className="home__hero_s_i_f__input_box" onChange={onChangeHandler} placeholder="1link.st/" />
              <button className="home__hero_s_i_f__search_button hover:bg-[#06B6D4]">Create my 1link</button>
            </div>
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
          <h2 className="home__gallary__heading text-center">Get a beautiful 1link for<br />
            your profile, at a  <span className="home__hero__s_h__span">fair price.</span></h2>
          <p className="text-[16px] md:text-[20px]  lg:text-[24px] text-gray-400 text-center">Basic features are free for your first book.</p>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-center pt-[80px]">
            {
              pricingData.map((item) => {
                return (
                  <div key={item.id} className={`${item.id === 1 ? "scale-[1.08] z-10 border-2  border-[#0991b2]" : "z-0"}` + " w-[380px] rounded-lg  px-5 py-8 relative bg-white shadow-xl"}>
                    {
                      item.id === 1 ? <div className="absolute top-0 right-0 w-full"><p className="px-4 py-[3px] rounded-full bg-[#0991b2] text-white w-[120px] text-center mx-auto -mt-[16px]">Launch deal</p></div> : null
                    }
                    <h5 className="text-[24px] font-bold text-center">Premium</h5>
                    <p className="flex items-center justify-center gap-2">
                      {
                        item.id === 1 ? <span className="text-[18px] font-bold text-gray-400">{item.subheading[1]}</span> : null
                      }
                      {
                        item.id !== 2 ? <span className="text-[36px] font-bold text-gray-700">{item.subheading[1]}</span> : null
                      }
                      {
                        item.id === 1 ? <span className="text-[18px] font-bold text-gray-400">US/month</span> : null
                      }
                      {
                        item.id === 2 ? <span className="text-[18px] font-bold text-gray-600">Contact us</span> : null
                      }
                    </p>
                    <ul className="text-center py-4">
                      {
                        item.list.map((item) => {
                          return (
                            <li key={item}>{item}</li>
                          )
                        })
                      }
                    </ul>
                    <div className="flex justify-center">
                      {
                        item.id === 1 ? <Button>{item.btn_text}</Button> : <button type="white" className="text-[#0991b2] bg-[#ECFEFF] hover:bg-[#CFFAFE] px-3 py-1 rounded-md">{item.btn_text}</button>
                      }
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>

        {/* faq  */}
        <div className="section" id="faq">
          <h2 className="home__gallary__heading text-center">Frequently asked questions</h2>
          <div className="max-w-[600px] mx-auto">
            {
              faqItems.map((item) => {
                return (
                  <FaqItem key={item.id} item={item} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const FaqItem = ({ item }) => {
  const { title, description } = item;
  const [openDesc, setOpenDesc] = useState(false);
  return (
    <div className="text-[14] lg:text-[18px] mb-5 flex items-start justify-start gap-3">
      <div>
        <TickIcon />
      </div>

      <div>
        <h5 onClick={() => setOpenDesc(!openDesc)} className=" hover:text-[#0e7490] font-bold cursor-pointer">{title}</h5>
        {
          openDesc ? <p>{description}</p> : null
        }
      </div>
    </div>
  )
}


const TickIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  )
}