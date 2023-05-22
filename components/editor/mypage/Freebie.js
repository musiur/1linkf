import axios from 'axios'
import UploadFile from 'components/UploadFile'
import { LoadingContext } from 'context/LoadingProvider'
import { PathContext } from 'context/PathProvider'
import { PopContext } from 'context/PopProvider'
import { UserContext } from 'context/UserProvider'
import { useContext, useEffect, useState } from 'react'

const Freebie = () => {
  const { userdata } = useContext(UserContext)
  const { pathname } = useContext(PathContext)
  const { setLoading } = useContext(LoadingContext)
  const { setMessage } = useContext(PopContext)

  const [action, setAction] = useState('update')
  const [formData, setFormData] = useState({
    file: '',
    extension: '',
    username: userdata ? userdata.username : '',
    pathname: pathname ? pathname : '',
  })
  const [errors, setErrors] = useState(formData)
  const [edited, setEdited] = useState(false)
  const [fileAdded, setFileAdded] = useState(false)

  const handleOnChange = (e) => {
    const { name, value, extension } = e.target
    setEdited(true)
    setFormData({ ...formData, [name]: value, extension })
    value && setFileAdded(true)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setErrors(validation(formData))
  }

  const validation = (data) => {
    let obj = {}

    if (!data.file.trim()) {
      obj.file = 'Upload a file!'
    }

    return obj
  }

  const CreateGiveway = async () => {
    setLoading(true)
    try {
      const API = `${process.env.API_HOST}/api/giveway/create`
      const response = await axios.post(API, formData)
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Giveway data created successfully!',
        })
      }
      setLoading(false)
    } catch (error) {
      if (error.response.status === 409) {
        setMessage({
          type: false,
          message: 'Giveway already reacted!',
        })
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
      setLoading(false)
    }
  }

  const UpdateGiveway = async () => {
    setLoading(true)
    try {
      const API = `${process.env.API_HOST}/api/giveway/update`
      const response = await axios.put(API, formData)
      if (response.status === 200) {
        setMessage({
          type: true,
          message: 'Giveway data updated successfully!',
        })
      }
    } catch (error) {
      setMessage({
        type: false,
        message: 'Something went wrong!',
      })
    }
    setLoading(false)
  }

  const GetGiveway = async () => {
    setLoading(true)
    try {
      const API = `${process.env.API_HOST}/api/giveway/${pathname}`
      const response = await axios.get(API)
      if (response.status === 200) {
        const fileFromDB = response.data.result[0]
        setMessage({
          type: true,
          message: 'Giveway data fetch successful!',
        })
        setFormData({
          ...formData,
          file: fileFromDB.file,
          extension: fileFromDB.extension,
        })
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage({
          type: false,
          message: 'No data found! Create now!',
        })
        setAction('create')
      } else {
        setMessage({
          type: false,
          message: 'Something went wrong!',
        })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      if (action === 'update') {
        if (edited) {
          UpdateGiveway()
        }
      } else {
        CreateGiveway()
      }
    }
  }, [errors])

  useEffect(() => {
    pathname && GetGiveway()
  }, [pathname])

  return (
    <div className="w-[400px] min-w-[310px] mx-auto grid grid-cols-1 gap-5 section m-5">
      <h1 className="text-xl lg:text-2xl font-semibold text-center">Giveway</h1>
      <p className="text-gray-400">
        Upload any document for giveway in main author site
      </p>
      <form className="grid grid-cols-1 gap-2">
        <UploadFile
          func={handleOnChange}
          name="file"
          defaultValue={formData?.file}
        />
        {errors.file ? (
          <span
            className={`${fileAdded ? 'text-green-400' : 'text-red-400'} m-1`}
          >
            {fileAdded ? 'File added!' : errors.file}
          </span>
        ) : null}
        <button
          className="px-5 py-1 rounded-md text-white bg-[#0891B2] mt-5"
          onClick={handleOnSubmit}
        >
          {action === 'update' ? 'Update' : 'Create'}
        </button>
      </form>

      {formData.file ? (
        <div className="p-3 rounded-md border border-gray-200 grid grid-cols-1 gap-2 mt-10">
          <p className="text-gray-400">
            You can download your giveway file from here
          </p>
          <a
            href={formData.file}
            download={`Give-resouces${formData.extension}`}
            target="_blank"
          >
            <button className="px-5 py-1 rounded-md bg-white text-gray-800 hover:shadow-xl border border-[#0891b2] font-semibold w-full">
              Download the resource
            </button>
          </a>
        </div>
      ) : null}
    </div>
  )
}

export default Freebie
