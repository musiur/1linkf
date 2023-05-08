import { createContext, useEffect, useState } from 'react'

export const EditorContext = createContext({})

const EditorProvider = ({ children }) => {
  const [editordata, setEditordata] = useState({
    headers: {
      name: 'Your name',
      outline: 'A short description of yourself, of anything you want to say!',
      hide1link: false,
    },
    socialLinks: [],
    links: [],
    books: [],
    appearance: {
      background: [
        {
          id: 1,
          color: '#8FC6FD',
        },
        {
          id: 2,
          color: '#D9ECFF',
        },
        {
          id: 3,
          color: '#0A85FF',
        },
      ],
      buttonConfig: {
        buttonBackground: '#125FAD',
        buttonStyle: { i: 1, j: 3 },
        buttonStyleFor: {
          background: '#125FAD',
          border: '1px solid ' + '#125FAD',
          color: 'white',
        },
        buttonRoundness: 'rounded-l-full',
        buttonRoundnessFor: 3,
      },
      iconStyle: '#125FAD',
    },
  })

  useEffect(() => {
    if (sessionStorage.getItem('editordata')) {
      sessionStorage.setItem('editordata', JSON.stringify(editordata))
    }
  }, [editordata])

  useEffect(() => {
    if (sessionStorage.getItem('editordata')) {
      console.log("--->", JSON.parse(sessionStorage.getItem('editordata')))
      setEditordata(JSON.parse(sessionStorage.getItem('editordata')))
    }
  }, [])

  return (
    <EditorContext.Provider value={{ editordata, setEditordata }}>
      {children}
    </EditorContext.Provider>
  )
}

export default EditorProvider
