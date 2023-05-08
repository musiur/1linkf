import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAmazon,
  faFacebook,
  faGooglePlay,
  faInstagram,
  faLinkedin,
  faPaypal,
  faPinterest,
  faSpotify,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { LoadingContext } from 'context/LoadingProvider'
import { PopContext } from 'context/PopProvider'

const MyCard = () => {
  const Router = useRouter()
  const linkPath = Router.query.linkpath

  const [editordata, setEditordata] = useState(null)
  const [gcolor, setGcolor] = useState()
  // const [fetchSuccess, setFetchSuccess] = useState(null)
  // const [username, setUsername] = useState(null)

  const { setLoading } = useContext(LoadingContext)
  const { setMessage } = useContext(PopContext)

  useEffect(() => {
    if (editordata) {
      const gradientColor = editordata.appearance.background
      if (gradientColor.length === 1) {
        setGcolor(gradientColor[0].color)
      }
      if (gradientColor.length === 2) {
        setGcolor(
          `linear-gradient(to bottom, ${gradientColor[0].color} 0%, ${gradientColor[1].color} 100%)`
        )
      }
      if (gradientColor.length === 3) {
        setGcolor(
          `linear-gradient(to bottom, ${gradientColor[0].color} 0%, ${gradientColor[1].color} 50%, ${gradientColor[2].color} 100%)`
        )
      }
    }
    editordata && setLoading(false)
  }, [editordata])

  const FetchEditorDataFromDatabase = async (username) => {
    try {
      const API_LINK = `${process.env.API_HOST}/api/editor/` + username
      const response = await axios.get(API_LINK)
      console.log(response)
      if (response.status === 200) {
        setEditordata(response.data.result[0].editorData)
        // setFetchSuccess('yes')
      }
    } catch (error) {
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
      setFetchSuccess('no')
    }
  }

  const FetchUserName = async () => {
    setLoading(true)
    try {
      const API_LINK = `${process.env.API_HOST}/api/links/` + linkPath
      const response = await axios.get(API_LINK)
      console.log(response)
      if (response.status === 200) {
        // setUsername(response.data.result[0].username)
        FetchEditorDataFromDatabase(response.data.result[0].username)
      }
    } catch (error) {
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
  }

  useEffect(() => {
    if (sessionStorage) {
      linkPath && FetchUserName()
    }
  }, [linkPath])

  return (
    <div className="min-h-[100vh]">
      {editordata ? (
        <div className="container section min-h-[100vh]">
          <div className="py-10 text-center">
            Share my link:
            <span className="text-blue-600 px-3">
              {`${
                window.location.host.includes('localhost')
                  ? 'http://'
                  : 'https://'
              }` +
                window.location.host +
                '/' +
                linkPath}
            </span>
          </div>
          <div
            className={`min-h-[800px] bg-white max-w-[500px] lg:w-auto p-5 flex flex-col items-center justify-center rounded-lg mx-auto`}
            style={{ background: gcolor }}
          >
            <div>
              <div className="max-w-[600px] min-w-[310px] m-auto">
                {editordata.headers.bannerPicture ? (
                  <img
                    src={editordata.headers.bannerPicture}
                    alt=""
                    className="w-full rounded-md m-auto z-1"
                  />
                ) : null}
                <div
                  className={`w-[120px] h-[120px] rounded-full m-auto ${
                    editordata.headers.bannerPicture ? '-mt-[70px]' : ''
                  }`}
                >
                  <img
                    src={editordata.headers.profilePicture}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
                <p className="mt-5 mb-2 text-xl font-bold text-center">
                  {editordata.headers.name}
                </p>
                <p className="my-2 text-center break-all">
                  {editordata.headers.outline}
                </p>

                <div className="my-5">
                  {editordata.socialLinks.length ? (
                    <div className="flex items-center justify-center gap-5">
                      {editordata.socialLinks.map((item) => {
                        const { label } = item
                        let icon = SelectIcon(label)
                        return (
                          <a key={item.id} href={item.url} target="_blank">
                            <FontAwesomeIcon
                              icon={icon}
                              style={{
                                color: editordata.appearance.iconStyle,
                              }}
                              className="text-2xl"
                            />
                          </a>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                {editordata.books.length ? (
                  <div className="grid grid-cols-1 gap-5">
                    {editordata.books.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="flex flex-col md:flex-row items-start justify-start gap-10 p-5 bg-[#ffffff97] rounded-lg backdrop-blur-sm shadow-xl"
                        >
                          <div>
                            <img
                              src={item.bookcover}
                              alt=""
                              className="min-w-[150px] min-h-[200px] w-[120px] h-[160px] rounded-md border bg-white"
                            />
                          </div>
                          <div>
                            <p className="text-lg font-bold my-3">
                              {item.title}{' '}
                              <span className="text-[14px] font-normal">
                                ({item.pagecount} pages)
                              </span>
                            </p>
                            <p className="mb-5 break-all">
                              <i>{item.outline}</i>
                            </p>
                            {item.bookbuttons.length ? (
                              <div className="max-w-[400px] flex items-center justify-start gap-3 flex-wrap">
                                {item.bookbuttons.map((btn) => {
                                  const btnStyle = {
                                    ...editordata.appearance.buttonConfig
                                      .buttonStyleFor,
                                  }
                                  return (
                                    <div key={btn.id}>
                                      {btn.type === 'link' ? (
                                        <a
                                          href={btn.url}
                                          target="_blank"
                                          className={
                                            editordata.appearance.buttonConfig.buttonRoundness.replace(
                                              '-l-',
                                              '-'
                                            ) + ' px-3 py-1 '
                                          }
                                          style={btnStyle}
                                        >
                                          {btn.label}
                                        </a>
                                      ) : (
                                        <select
                                          defaultValue={btn.label}
                                          className={
                                            editordata.appearance.buttonConfig.buttonRoundness.replace(
                                              '-l-',
                                              '-'
                                            ) + ' px-3 py-1 '
                                          }
                                          style={btnStyle}
                                          onChange={(e) => {
                                            window.open(
                                              e.target.value,
                                              '_blank'
                                            )
                                          }}
                                        >
                                          {btn.options.map((opt) => {
                                            return (
                                              <option
                                                key={opt.id}
                                                value={opt.url}
                                              >
                                                {opt.label}
                                              </option>
                                            )
                                          })}
                                        </select>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </div>
              <div className="py-5 flex flex-col items-center justify-center gap-3">
                {editordata.links.length
                  ? editordata.links.map((item) => {
                      const btnStyle = {
                        ...editordata.appearance.buttonConfig.buttonStyleFor,
                      }
                      return (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          className={
                            editordata.appearance.buttonConfig.buttonRoundness.replace(
                              '-l-',
                              '-'
                            ) + ' px-10 py-3 text-xl'
                          }
                          style={btnStyle}
                        >
                          {item.label}
                        </a>
                      )
                    })
                  : null}
              </div>
              {editordata.headers.hide1link ? null : (
                <div className="flex items-center justify-center py-10">
                  <a
                    href="https://1link.st"
                    target="_blank"
                    className="px-3 py-1 bg-white text-black font-bold"
                  >
                    1link
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MyCard

const SelectIcon = (label) => {
  let icon = faFacebook
  if (label === 'Facebook') {
    icon = faFacebook
  } else if (label === 'Instagram') {
    icon = faInstagram
  } else if (label === 'Spotify') {
    icon = faSpotify
  } else if (label === 'Youtube') {
    icon = faYoutube
  } else if (label === 'Amazon') {
    icon = faAmazon
  } else if (label === 'Email') {
    icon = faEnvelope
  } else if (label === 'Twitter') {
    icon = faTwitter
  } else if (label === 'Linkedin') {
    icon = faLinkedin
  } else if (label === 'Pinterest') {
    icon = faPinterest
  } else if (label === 'Paypal') {
    icon = faPaypal
  } else if (label === 'Google Play') {
    icon = faGooglePlay
  } else if (label === 'TikTok') {
    icon = faTiktok
  }
  return icon
}

// const Dummy = () => {
//   return (
//     <div>hkgkjhg
//     </div>
//   )
// }

// export default Dummy;
