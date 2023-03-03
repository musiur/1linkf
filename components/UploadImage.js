import Image from 'next/image'
import { useEffect, useState } from 'react'
import Avatar from './avatar.jpg'

const UploadImage = ({ type, func, name, defaultValue, label }) => {
  console.log({ defaultValue })
  const [postImage, setPostImage] = useState({
    myFile: defaultValue ? defaultValue : '',
  })
  const [imageName, setImageName] = useState('Upload picture')
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setPostImage({ ...postImage, myFile: base64 })
    setImageName(file.name)
  }

  useEffect(() => {
    func({
      target: {
        name: name,
        value: postImage.myFile,
      },
    })
  }, [postImage])

  const imageStyle = `${
    type === 'profile'
      ? 'w-[100px] h-[100px] rounded-full '
      : ' w-[200px] h-auto rounded-md'
  } border-2 border-blue-200`
  return (
    <div>
      {postImage.myFile ? (
        <img src={postImage.myFile} alt="" className={imageStyle} />
      ) : null}
      <div className="relative px-3 py-1 rounded-md border mt-5">
        {imageName !== 'Upload picture' ? (
          <span className="font-medium">Uploaded Picture:</span>
        ) : null}{' '}
        {imageName}
        <input
          type="file"
          label="Image"
          name="myFile"
          id="file-upload"
          accept=".jpeg, .png. jpg"
          onChange={handleFileUpload}
          className="absolute top-0 left-0 w-full h-full border opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default UploadImage

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}