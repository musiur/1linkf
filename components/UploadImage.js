import Image from "next/image"
import { useEffect, useState } from "react"

const UploadImage = ({ type, func, name, defaultValue, label }) => {
    const [selectedFile, setSelectedFile] = useState(defaultValue ? defaultValue : "");
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl);

        func({
            target: {
                name,
                value: selectedFile
            }
        })

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    return (
        <div>
            {selectedFile && preview ? <div className={`relative ${type === "profile" ? "rounded-full w-[100px] h-[100px]" : "rounded-md w-full min-h-[200px] h-auto"}`}>
                <Image src={preview} alt="profile" fill style={{objectFit:"cover"}} className={type === "profile" ? "rounded-full border" : "rounded-md border"} />
            </div> : null}
            <div className="relative border px-3 py-1 rounded-md mt-2 shadow-md">
                {
                    selectedFile?.name ? selectedFile.name + " - click again to change" : label ? label : "Upload picture"
                }
                <input type='file' onChange={onSelectFile} className="absolute top-0 left-0 w-full h-full opacity-0" />
            </div>
        </div>
    )
}

export default UploadImage;