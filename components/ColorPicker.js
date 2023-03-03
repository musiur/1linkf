import { EditorContext } from 'context/EditorProvider'
import { useContext, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import CloseIcon from './icons/CloseIcon'

const ColorPicker = ({ index, type, defaultColor }) => {
  const [color, setColor] = useState(defaultColor ? defaultColor : '#aabbcc')
  const { editordata, setEditordata } = useContext(EditorContext)
  const [showPicker, setShowPicker] = useState(false)
  useEffect(() => {
    console.log({ color })

    if (type) {
      let tempEData = { ...editordata }
      editordata.appearance.buttonConfig.buttonBackground = color
      setEditordata(tempEData)
    } else {
      let tempEData = { ...editordata }
      editordata.appearance.background.find((item) => item.id === index).color =
        color
      setEditordata(tempEData)
    }
  }, [color])

  return (
    <div className="relative">
      <div
        className={`h-[50px] w-[50px] rounded-md  border z-0`}
        style={{ background: color }}
        onClick={() => setShowPicker(true)}
      ></div>
      {showPicker ? (
        <div className="absolute top-[50px] left-0">
          <div
            className="h-[30px] w-[30px] rounded-full cursor-pointer border flex items-center justify-center border-black z-10"
            onClick={() => setShowPicker(false)}
          >
            <CloseIcon />
          </div>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      ) : null}
    </div>
  )
}

export default ColorPicker
