

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
  return (
    <div>
      <div className="home__hero">
        <div className="home__hero_searchfield">
          <h1 className="home__hero__s_heading">The <span className="home__hero__s_h__span">one link</span> your readers
            will need to find
            you and <span className="home__hero__s_h__span">your books</span>.</h1>
          <div className="home__hero__s_input_field">
            <input type="text" name="checkAvailability" defaultValue="1link.st/" className="home__hero_s_i_f__input_box" onChange={onChangeHandler} placeholder="1link.st/" />
            <button className="home__hero_s_i_f__search_button">Create my 1link</button>
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
      <div className="home__gallary">
        <h2 className="home__gallary__heading">Showcase your books on a page with <br /> <span className="home__hero__s_h__span">the colors and style</span> you want.</h2>
        <div className="flex items-start justify-between px-5">
          {
            [1,2,3,4,5,6].map((i) => {
              return (
                <div key={i} className="relative">
                  <Image
                    alt="card"
                    src={`/images/gallary-${i}.webp`}
                    width={288}
                    height={500}
                    className={`rounded-xl min-w-[288px] min-h-[506px] hover:scale-[1.08] transition ease-in-out`}
                    style={{marginLeft: `-${i*10}px`, marginTop: `${i*15}px`}}
                  />
                </div>
              )
            })
          }
        </div>
      </div>

      {/* faq  */}
      <div className="container section">
        <h2 className="home__gallary__heading">Frequently asked questions</h2>
          <div className="max-w-[600px] mx-auto">
          {
            faqItems.map((item) => {
              return(
                <FaqItem key={item.id} item={item}/>
              )
            })
          }
          </div>
      </div>
    </div>
  )
}

const FaqItem = ({item}) => {
  const {title ,description} = item;
  const [openDesc, setOpenDesc] = useState(false);
  return (
    <div className="text-[18px] mb-5">
      <h5 onClick={() => setOpenDesc(!openDesc)} className=" hover:text-[#0e7490] font-bold cursor-pointer">{title}</h5>
      {
        openDesc ? <p>{description}</p> : null
      }
    </div>
  )
}
