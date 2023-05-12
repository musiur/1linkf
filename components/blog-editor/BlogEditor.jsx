

import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'

const ReactQuill = dynamic(import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

const BlogEditor = ({ handleOnChange, name, defaultValue }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '')
  useEffect(() => {
    if (value) {
      handleOnChange({
        target: {
          name,
          value,
        },
      })
    }
  }, [value])
  return (
    <div>
      <ReactQuill
        modules={modules}
        placeholder="compose here"
        value={value}
        onChange={setValue}
        formats={formats}
        theme="snow"
      />
    </div>
  )
}

export default BlogEditor
