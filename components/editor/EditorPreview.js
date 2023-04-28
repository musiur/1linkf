import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditorContext } from 'context/EditorProvider'
import { useContext, useEffect, useState } from 'react'
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

const EditorPreview = () => {
  const { editordata, setEditordata } = useContext(EditorContext)
  const [gcolor, setGcolor] = useState()
  useEffect(() => {
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
  }, [editordata])
  console.log(editordata)
  return (
    <div
      className={`min-h-[800px] rounded-xl shadow-xl border bg-white w-full lg:w-auto p-5`}
      style={{ background: gcolor }}
    >
      <div>
        <img
          src={editordata.headers.profilePicture}
          alt=""
          className="w-[100px] h-[100px] rounded-full m-auto"
        />
        <p className="mt-5 mb-2 text-xl font-bold text-center">
          {editordata.headers.name}
        </p>
        <p className="my-2 text-center">
          <i>{editordata.headers.outline}</i>
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
                    <p className="mb-5">
                      <i>{item.outline}</i>
                    </p>
                    {item.bookbuttons.length ? (
                      <div className="max-w-[400px] flex items-center justify-start gap-3 flex-wrap">
                        {item.bookbuttons.map((btn) => {
                          const btnStyle = {
                            ...editordata.appearance.buttonConfig
                              .buttonStyleFor,
                            // background:
                            //   editordata.appearance.buttonConfig
                            //     .buttonBackground,
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
                                    window.open(e.target.value, '_blank')
                                  }}
                                >
                                  {btn.options.map((opt) => {
                                    return (
                                      <option key={opt.id} value={opt.url}>
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
                // background: editordata.appearance.buttonConfig.buttonBackground,
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
          <a href="https://1link.st" target="_blank" className="px-3 py-1 bg-white text-black font-bold">
            1link
          </a>
        </div>
      )}
    </div>
  )
}

export default EditorPreview

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
  }
  return icon
}
