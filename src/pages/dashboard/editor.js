import Dashboard from '@/pages/dashboard'
import axios from 'axios'
import Button from 'components/Button'
import Appearance from 'components/editor/Appearance'
import Books from 'components/editor/Books'
import EditorPreview from 'components/editor/EditorPreview'
import Header from 'components/editor/Header'
import Links from 'components/editor/Links'
import SocialLinks from 'components/editor/SocialLinks'
import Spinner from 'components/icons/Spinner'
import { EditorContext } from 'context/EditorProvider'
import { UserContext } from 'context/UserProvider'
import { useContext, useEffect, useState } from 'react'

const Editor = () => {
  const { userdata } = useContext(UserContext)
  const tabs = ['Header', 'Social links', 'Links', 'Books', 'Appearance']
  const [currentTab, setCurrentTab] = useState('Header')
  const [showFullEditor, setShowFullEditor] = useState(false)
  const { editordata, setEditordata } = useContext(EditorContext)
  const [saveState, setSaveState] = useState(null)

  const handleEditorDataPost = async () => {
    const POST_API = `${process.env.API_HOST}/api/editor/create`
    const UPDATE_API =
      `${process.env.API_HOST}/api/editor/update/` + userdata.username
    try {
      setSaveState('spin')
      const response = await axios.post(POST_API, {
        editorData: { ...editordata },
        username: userdata.username,
      })

      if (response.status === 200) {
        setSaveState('Saved')
        sessionStorage.setItem('editordata', JSON.stringify({ editordata }))
      }
      setTimeout(() => {
        setSaveState(null)
      }, 5000)
    } catch (error) {
      if (error.response.status === 409) {
        try {
          const res = await axios.put(UPDATE_API, {
            editorData: { ...editordata },
            username: userdata.username,
          })
          if (res.status === 200) {
            setSaveState('Saved')
          }
          setTimeout(() => {
            setSaveState(null)
          }, 5000)
        } catch (error) {
          setSaveState(null)
        }
      }
    }
  }

  const FetchEditorDataFromDatabase = async () => {
    try {
      const API_LINK = `${process.env.API_HOST}/api/editor/` + userdata.username
      const response = await axios.get(API_LINK)
      console.log(response)
      if (response.status === 200) {
        setEditordata({ ...response.data.result[0].editorData })
        sessionStorage.setItem(
          'editordata',
          JSON.stringify({ ...response.data.result[0].editorData })
        )
        setShowFullEditor(true)
      }
    } catch (error) {
      console.log({
        message: error,
      })
      setShowFullEditor(true)
    }
  }

  useEffect(() => {
    if (userdata.username) {
      FetchEditorDataFromDatabase()
    }
  }, [userdata.username])
  return (
    <Dashboard>
      {showFullEditor ? (
        <div className="p-5 bg-[#F1F2F3]">
          <h1 className="text-lg lg:text-xl font-bold mb-5">Editor</h1>
          <div className="flex flex-wrap items-start justify-start gap-10 ">
            <div className="bg-white rounded-md p-5 min-w-[600px] w-full lg:w-auto">
              <div className="flex items-center justify-between gap-[50px]">
                <div className="flex items-center justify-start gap-4">
                  {tabs.map((tab) => {
                    return (
                      <div
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={`border-b-2 ${
                          currentTab === tab
                            ? 'border-[#0891B2] text-[#0891B2]'
                            : 'border-white text-black'
                        } cursor-pointer`}
                      >
                        {tab}
                      </div>
                    )
                  })}
                </div>
                <button
                  className="bg-[#0891B2] text-white px-4 py-1 rounded-md hover:bg-[#0891B295]"
                  onClick={handleEditorDataPost}
                >
                  {saveState === 'spin' ? (
                    <div className="px-3 rounded-md flex gap-1 items-center max-w-[130px]">
                      <Spinner /> Saving...
                    </div>
                  ) : saveState === 'Saved' ? (
                    saveState
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
              {currentTab === 'Header' ? (
                <Header />
              ) : currentTab === 'Social links' ? (
                <SocialLinks />
              ) : currentTab === 'Links' ? (
                <Links />
              ) : currentTab === 'Books' ? (
                <Books />
              ) : currentTab === 'Appearance' ? (
                <Appearance />
              ) : null}
            </div>
            <EditorPreview />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[100vh]">
          <div className="bg-gray-800 px-3 py-1 rounded-md flex gap-1 items-center max-w-[130px] text-white">
            <Spinner /> loading...
          </div>
        </div>
      )}
    </Dashboard>
  )
}

export default Editor
