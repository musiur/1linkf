import ColorPicker from 'components/ColorPicker'
import { EditorContext } from 'context/EditorProvider'
import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  solid,
  regular,
  brands,
  icon,
} from '@fortawesome/fontawesome-svg-core/import.macro'

const Appearance = () => {
  const { editordata, setEditordata } = useContext(EditorContext)
  const [gradientColor, setGradientColor] = useState([
    editordata.appearance.buttonConfig.buttonBackground,
  ])
  const [gcolor, setGcolor] = useState(
    `${editordata.appearance.background[0].color}`
  )

  const [buttonRoundness, setButtonRoundness] = useState(
    editordata.appearance.buttonConfig.buttonRoundness
  )
  const [buttonRoundnessFor, setButtonRoundnessFor] = useState(
    editordata.appearance.buttonConfig.buttonRoundnessFor
  )
  const [buttonStyle, setButtonStyle] = useState(
    editordata.appearance.buttonConfig.buttonStyle
  )
  const [buttonStyleFor, setButtonStyleFor] = useState(
    editordata.appearance.buttonConfig.buttonStyleFor
  )

  const [iconStyle, setIconStyle] = useState(editordata.appearance.iconStyle)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    let tempArr = []
    if (name === 'background') {
      if (value === 1) {
        tempArr.push({
          id: editordata.appearance.background[0].id,
          color: editordata.appearance.background[0].color,
        })
      }
      if (value === 2) {
        if (editordata.appearance.background.length >= 2) {
          tempArr.push({
            id: editordata.appearance.background[0].id,
            color: editordata.appearance.background[0].color,
          })
          tempArr.push({
            id: editordata.appearance.background[1].id,
            color: editordata.appearance.background[1].color,
          })
        }
        if (editordata.appearance.background.length === 1) {
          tempArr.push({
            id: editordata.appearance.background[0].id,
            color: editordata.appearance.background[0].color,
          })
          tempArr.push({
            id: 2,
            color: '#ffffff',
          })
        }
      }
      if (value === 3) {
        if (editordata.appearance.background.length === 1) {
          tempArr.push({
            id: editordata.appearance.background[0].id,
            color: editordata.appearance.background[0].color,
          })
          tempArr.push({
            id: 2,
            color: '#ffffff',
          })
          tempArr.push({
            id: 3,
            color: '#ffffff',
          })
        }
        if (editordata.appearance.background.length === 2) {
          tempArr.push({
            id: editordata.appearance.background[0].id,
            color: editordata.appearance.background[0].color,
          })
          tempArr.push({
            id: editordata.appearance.background[1].id,
            color: editordata.appearance.background[1].color,
          })
          tempArr.push({
            id: 3,
            color: '#ffffff',
          })
        }
        if (editordata.appearance.background.length === 3) {
          tempArr === [...editordata.appearance.background]
        }
      }
    }
    setEditordata({
      ...editordata,
      ['appearance']: { ...editordata.appearance, [name]: [...tempArr] },
    })
  }

  useEffect(() => {
    setGradientColor([...editordata.appearance.background])
  }, [editordata.appearance.background])

  useEffect(() => {
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
  }, [gradientColor, editordata])

  useEffect(() => {
    setIconStyle(editordata.appearance.buttonConfig.buttonBackground)
    setButtonStyleFor({
      ...editordata.appearance.buttonConfig.buttonStyleFor,
      ['background']: editordata.appearance.buttonConfig.buttonBackground,
    })
  }, [editordata.appearance.buttonConfig.buttonBackground])

  return (
    <div className="my-4 flex flex-col items-start justify-start gap-5">
      <div>
        <label>Background color</label>
        <div className="flex items-center justify-start gap-3">
          <div className="flex items-center gap-1 justify-start">
            <input
              type="radio"
              id="one"
              name="background"
              onChange={() =>
                handleOnChange({
                  target: {
                    name: 'background',
                    value: 1,
                  },
                })
              }
              defaultChecked={editordata.appearance.background.length === 1}
            />
            <label htmlFor="one">One</label>
          </div>
          <div className="flex items-center gap-1 justify-start">
            <input
              type="radio"
              id="two"
              name="background"
              onChange={() =>
                handleOnChange({
                  target: {
                    name: 'background',
                    value: 2,
                  },
                })
              }
              defaultChecked={editordata.appearance.background.length === 2}
            />
            <label htmlFor="two">Two</label>
          </div>
          <div className="flex items-center gap-1 justify-start">
            <input
              type="radio"
              id="three"
              name="background"
              onChange={() =>
                handleOnChange({
                  target: {
                    name: 'background',
                    value: 3,
                  },
                })
              }
              defaultChecked={editordata.appearance.background.length === 3}
            />
            <label htmlFor="three">Three</label>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-start gap-1">
            {editordata.appearance.background.map((item) => {
              return (
                <ColorPicker
                  key={item.id}
                  index={item.id}
                  defaultColor={item.color}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label>Button Setting</label>
        <div>
          <p>Background color</p>
          <ColorPicker
            type="button_background"
            defaultColor={editordata.appearance.buttonConfig.buttonBackground}
          />
        </div>
        <div>
          <p>Style</p>
          <div className="flex flex-col gap-1">
            {[1, 2, 3].map((item) => {
              return (
                <div key={item} className="flex gap-1">
                  {[3, 4, 5].map((item1) => {
                    const buttonBack =
                      editordata.appearance.buttonConfig.buttonBackground
                    const buttonBorder = '1px solid '
                    const buttonDeptStyle = {
                      background:
                        item1 === 3
                          ? buttonBack
                          : item1 === 4
                          ? buttonBack + '85'
                          : buttonBack + '00',
                      border:
                        item === 1
                          ? buttonBorder + buttonBack
                          : item === 2
                          ? buttonBorder + 'gray'
                          : buttonBorder + 'black',
                      color: item1 === 5 ? 'black' : 'white',
                    }
                    return (
                      <div
                        key={item1}
                        className={`border-2 rounded-md ${
                          buttonStyle.i === item && buttonStyle.j === item1
                            ? 'border-orange-600'
                            : 'border-white'
                        }`}
                      >
                        {editordata ? (
                          <div
                            className="h-[50px] w-[50px] border rounded cursor-pointer"
                            style={{ background: gcolor }}
                            // config setter
                            onClick={() => {
                              setButtonStyle({ i: item, j: item1 })
                              setButtonStyleFor(buttonDeptStyle)

                              let tempED = { ...editordata }
                              tempED.appearance.buttonConfig.buttonStyle = {
                                i: item,
                                j: item1,
                              }
                              tempED.appearance.buttonConfig.buttonStyleFor =
                                buttonDeptStyle

                              setEditordata(tempED)
                            }}
                          >
                            <div
                              className={`text-white w-[35px] h-[35px] ml-auto my-[6.5px] flex items-center justify-end ${buttonRoundness}`}
                              style={buttonDeptStyle}
                            >
                              aaa
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <p>Button corners</p>
          <div className="flex gap-1">
            {[3, 4, 5].map((item1) => {
              return (
                <div
                  key={item1}
                  className={`border-2 ${
                    item1 === buttonRoundnessFor
                      ? 'border-orange-600'
                      : 'border-white'
                  } rounded-md`}
                >
                  {editordata ? (
                    <div
                      className="h-[50px] w-[50px] border rounded cursor-pointer"
                      style={{ background: gcolor }}
                      //   style setter
                      onClick={() => {
                        setButtonRoundnessFor(item1)
                        setButtonRoundness(
                          item1 === 3
                            ? 'rounded-l-full'
                            : item1 === 4
                            ? 'rounded-l-md'
                            : 'rounded-0'
                        )
                        let tempED = { ...editordata }
                        tempED.appearance.buttonConfig.buttonRoundnessFor =
                          item1
                        tempED.appearance.buttonConfig.buttonRoundness =
                          item1 === 3
                            ? 'rounded-l-full'
                            : item1 === 4
                            ? 'rounded-l-md'
                            : 'rounded-0'

                        setEditordata(tempED)
                      }}
                    >
                      <div
                        className={`border border-gray-400 text-white w-[35px] h-[35px] ml-auto my-[6.5px] flex items-center justify-end ${
                          item1 === 3
                            ? 'rounded-l-full'
                            : item1 === 4
                            ? 'rounded-l-md'
                            : 'rounded-l-0'
                        }`}
                        style={buttonStyleFor}
                      >
                        aaa
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <p>Icon style</p>
        <div className="flex items-center justify-start gap-1">
          {[1, 2].map((item) => {
            return (
              <div
                key={item}
                className={`border-2 rounded-md ${
                  iconStyle !== 'white' && item === 1
                    ? 'border-orange-600'
                    : iconStyle === 'white' && item === 2
                    ? 'border-orange-600'
                    : 'border-white'
                }`}
              >
                {editordata ? (
                  <div
                    className="h-[50px] w-[50px] border rounded cursor-pointer flex items-center justify-center"
                    style={{ background: gcolor }}
                    onClick={() => {
                      setIconStyle(
                        item === 1
                          ? editordata.appearance.buttonConfig.buttonBackground
                          : 'white'
                      )
                      let tempED = { ...editordata }
                      tempED.appearance.iconStyle =
                        item === 1
                          ? editordata.appearance.buttonConfig.buttonBackground
                          : 'white'
                      setEditordata(tempED)
                    }}
                  >
                    <FontAwesomeIcon
                      icon={brands('twitter')}
                      style={{
                        color:
                          item === 1
                            ? editordata.appearance.buttonConfig
                                .buttonBackground
                            : 'white',
                      }}
                      className="text-2xl"
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Appearance
