import axios from 'axios'
import { EditorContext } from 'context/EditorProvider'
import { UserContext } from 'context/UserProvider'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

const { default: Spinner } = require('./icons/Spinner')

const LinkChecker = () => {
  const [linkAvailable, setLinkAvailable] = useState(false)
  const [spinLA, setSpinLA] = useState(false)
  const [pathname, setPathname] = useState('')
  const { editordata, setEditordata } = useContext(EditorContext)
  const { userdata, setUserdata } = useContext(UserContext)
  const Router = useRouter()

  const checkAvailability = async (pathName) => {
    try {
      setSpinLA(true)
      const api = `${process.env.API_HOST}/api/links/availability/` + pathName
      const response = await axios.get(api)
      console.log(response)
      if (response.status === 200) {
        setLinkAvailable(true)
      }
      setSpinLA(false)
    } catch (error) {
      console.log(error)
      setSpinLA(false)
      setLinkAvailable(false)
    }
  }

  const onChangeHandler = (e) => {
    if (e.target.value) {
      setPathname(e.target.value.split('/')[1])
      checkAvailability(e.target.value.split('/')[1])
    }
  }

  const handleEditorDataPost = async () => {
    const POST_API = `${process.env.API_HOST}/api/editor/create`
    const UPDATE_API =
      `${process.env.API_HOST}/api/editor/update/` + userdata.username
    try {
      const response = await axios.post(POST_API, {
        editorData: {
          ...editordata,
          ['headers']: { ...editordata.headers, ['url']: pathname },
        },
        username: userdata.username,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
      if (error.response.status === 409) {
        try {
          const res = await axios.put(UPDATE_API, {
            editorData: {
              ...editordata,
              ['headers']: { ...editordata.headers, ['url']: pathname },
            },
            username: userdata.username,
          })

          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const CreateLink = async () => {
    if (!userdata.username) {
      Router.push('/dashboard/editor')
    }
    if (linkAvailable && pathname && userdata.username) {
      try {
        const api = `${process.env.API_HOST}/api/links/create`
        const response = await axios.post(
          api,
          { pathname, username: userdata.username },
          {
            headers: {
              'x-access-token': sessionStorage.getItem('access-token'),
            },
          }
        )
        console.log(response)
        if (response.status === 200) {
          let tempED = { ...editordata }
          tempED.headers.url = pathname
          setEditordata(tempED)
          handleEditorDataPost()
          Router.push('/dashboard/editor')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
      <div className="home__hero__s_input_field">
        <input
          type="text"
          name="checkAvailability"
          defaultValue="1link.st/"
          className="home__hero_s_i_f__input_box"
          onChange={onChangeHandler}
          placeholder="1link.st/"
        />
        <button
          className="home__hero_s_i_f__search_button hover:bg-[#06B6D4]"
          onClick={CreateLink}
        >
          Create my 1link
        </button>
      </div>
      <div className="relative h-0">
        <div className="absolute top-0 left-0 w-full">
          {spinLA ? (
            <div className="bg-gray-800 px-3 py-1 rounded-md flex gap-1 items-center max-w-[250px] text-white">
              <Spinner /> Checking availability...
            </div>
          ) : null}
          {linkAvailable ? (
            <div>Link Available!</div>
          ) : (
            <div>Link Not Available!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LinkChecker
