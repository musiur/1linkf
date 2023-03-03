import Dashboard from '@/pages/dashboard'
import axios from 'axios'
import Button from 'components/Button'
import Spinner from 'components/icons/Spinner'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)
  const [edit, setEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selected, setSelected] = useState(null)

  const FetchUsersData = async () => {
    try {
      setShowSpinner(true)
      const response = await axios.get(
        `${process.env.API_HOST}/api/test/user`,
        {
          headers: {
            'x-access-token': sessionStorage.getItem('access_token'),
          },
        }
      )
      if (response.status === 200) {
        // console.log(response.data.userList)
        setUsers(response.data.userList)
      }
      setShowSpinner(false)
    } catch (error) {
      setShowSpinner(false)
    }
  }
  useEffect(() => {
    FetchUsersData()
  }, [])

  return (
    <Dashboard>
      <div className="relative p-5 h-full">
        <h1 className="text-lg lg:text-xl font-bold mb-5">Manage Users</h1>
        {users.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {users.map((item) => {
              return (
                <div
                  key={item._id}
                  className="border rounded-md p-5 hover:border-[#0991b2] bg-white"
                >
                  <p className="font-medium">Username: {item.username}</p>
                  <p>Email: {item.email}</p>
                  <div className="flex items-center justify-start gap-1 mt-4">
                    <Button
                      onClick={() => {
                        setSelected(item)
                        setEdit(true)
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      type="warning"
                      onClick={() => {
                        setSelected(item)
                        setDeleteModal(true)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : showSpinner ? (
          <div className="flex items-center justify-center min-h-[100vh]">
            <div className="bg-gray-800 px-3 py-1 rounded-md flex gap-1 items-center max-w-[130px] text-white">
              <Spinner /> loading...
            </div>
          </div>
        ) : (
          <div>No user found!</div>
        )}
        {edit ? (
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000050] flex items-start justify-center pt-10">
            <div className="sticky top-[130px] bg-white p-5 rounded-md border min-w-[310px]">
              <UpdateForm userdata={{ ...selected, setEdit }} />
            </div>
          </div>
        ) : null}
        {deleteModal ? (
          <div className="absolute top-0 left-0 w-full h-full bg-[#00000050] flex items-start justify-center pt-10">
            <div className="sticky top-[130px] bg-white p-5 rounded-md border-2 border-red-400 min-w-[310px]">
              <DeleteForm userdata={{ ...selected, setDeleteModal }} />
            </div>
          </div>
        ) : null}
      </div>
    </Dashboard>
  )
}

export default ManageUsers

const UpdateForm = ({ userdata }) => {
  const [formData, setFormData] = useState({
    username: userdata.username,
    email: userdata.email,
    link: '',
  })
  const [errorMessage, setErrorMessage] = useState({})
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState(null)
  const [clicked, setClicked] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    console.log(value)
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = (e) => {
    console.log('Clicked')
    e.preventDefault()
    setErrorMessage(validate(formData))
  }

  const validate = (data) => {
    let err = {}

    if (!data.username.trim()) {
      err.username = 'Username is required!'
    }
    if (!data.email.trim()) {
      err.email = 'Email is required!'
    }

    return err
  }

  const UpdateApiCall = async () => {
    try {
      setSpinner(true)
      const response = await axios.put(
        `${process.env.API_HOST}/api/test/user/update/${userdata._id}`,
        formData,
        {
          headers: {
            'x-access-token': sessionStorage.getItem('access_token'),
          },
        }
      )
      if (response) {
        setSpinner(false)
        if (response.status === 200) {
          setMessage({
            type: true,
            message: response.data.message,
          })
        } else {
          setMessage({
            type: false,
            message: response.data.message,
          })
        }
      }
    } catch (error) {
      setSpinner(false)
      console.log(error)
      setMessage({
        type: false,
        message: error.response.data.message,
      })
    }

    setClicked(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      clicked && UpdateApiCall()
    } else {
      console.log(errorMessage)
    }
  }, [errorMessage])

  const FetchPathname = () => {}
  useEffect(() => {
    FetchPathname()
  }, [])
  return (
    <div>
      {message ? (
        <div
          className={`${
            message.type ? 'bg-green-400' : 'bg-red-600'
          } text-white px-2 py-[4px] rounded-md mb-2 text-center`}
        >
          {message.message}
        </div>
      ) : null}
      <form id="sign_up_form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleOnChange}
          id="username"
          defaultValue={formData.username}
        />
        {errorMessage?.username ? <span>{errorMessage.username}</span> : null}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleOnChange}
          id="email"
          defaultValue={formData.email}
        />
        {errorMessage?.email ? <span>{errorMessage.email}</span> : null}
        <Button
          onClick={(e) => {
            setClicked(true)
            handleOnSubmit(e)
          }}
          disable={spinner}
        >
          {spinner ? <Spinner /> : null}
          {spinner ? 'Processing' : 'Update'}
        </Button>
      </form>
      <div className="mt-5 flex justify-center">
        <Button type="warning" onClick={() => userdata.setEdit(false)}>
          Close
        </Button>
      </div>
    </div>
  )
}

const DeleteForm = ({ userdata }) => {
  const [formData, setFormData] = useState({ username: '' })
  const [errorMessage, setErrorMessage] = useState({})
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState(null)
  const [clicked, setClicked] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    console.log(value)
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = (e) => {
    console.log('Clicked')
    e.preventDefault()
    setErrorMessage(validate(formData))
  }

  const validate = (data) => {
    let err = {}

    if (!data.username.trim()) {
      err.username = 'Username is required!'
    }

    return err
  }

  const DeleteApiCall = async () => {
    try {
      setSpinner(true)
      console.log(formData)
      const response = await axios.delete(
        `${process.env.API_HOST}/api/test/user/delete/${formData.username}/${userdata._id}`,
        {
          headers: {
            'x-access-token': sessionStorage.getItem('access_token'),
          },
        }
      )
      if (response) {
        setSpinner(false)
        if (response.status === 200) {
          setMessage({
            type: true,
            message: response.data.message,
          })
          document.getElementById('sign_up_form').reset()
          userdata.setDeleteModal(false)
        } else {
          setMessage({
            type: false,
            message: response.data.message,
          })
        }
      }
    } catch (error) {
      setSpinner(false)
      console.log(error)
      setMessage({
        type: false,
        message: error.response.data.message,
      })
    }

    setClicked(false)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    if (Object.keys(errorMessage).length === 0) {
      clicked && DeleteApiCall()
    } else {
      console.log(errorMessage)
    }
  }, [errorMessage])
  return (
    <div>
      {message ? (
        <div
          className={`${
            message.type ? 'bg-green-400' : 'bg-red-600'
          } text-white px-2 py-[4px] rounded-md mb-2 text-center`}
        >
          {message.message}
        </div>
      ) : null}
      <form id="sign_up_form">
        <label htmlFor="username" className="break-all">
          Please enter your username{' '}
          <span className="text-red-400 font-medium break-all">
            {userdata.username}
          </span>{' '}
          here
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleOnChange}
          id="username"
        />
        {errorMessage?.username ? <span>{errorMessage.username}</span> : null}
        <div className="my-2 flex justify-center">
          <Button
            onClick={(e) => {
              e.preventDefault()
              userdata.setDeleteModal(false)
            }}
          >
            Close
          </Button>
        </div>
        <Button
          type="warning-solid"
          onClick={(e) => {
            setClicked(true)
            handleOnSubmit(e)
          }}
          disable={spinner}
        >
          {spinner ? <Spinner /> : null}
          {spinner ? 'Processing' : 'Delete'}
        </Button>
      </form>
    </div>
  )
}
