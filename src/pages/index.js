

import Button from 'components/Button'
import Image from 'next/image'


export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-between gap-10 min-h-[90vh] container section">
        <div className="my-auto">
          <h1 className="text-[48px] leading-[55px] font-bold">The <span className="text-[#0891B2]">one link</span> your readers
            will need to find
            you and <span className="text-[#0891B2]">your books</span>.</h1>
          <div className="mt-10 flex items-center justify-start gap-3">
            <input type="text" value="1link.st/" className="border outline-0 rounded-md px-3 py-3 text-[18px] text-gray-400 shadow-md" />
            <button className="py-[14px] px-3 bg-[#0991b2] rounded-md text-white">Create my 1link</button>
          </div>
        </div>
        <div className="relative">
          <Image
            alt="card"
            src="https://1link.st/_next/image?url=%2Fiphone_mockup.png&w=640&q=75"
            width={700}
            height={1300}
          />
        </div>
      </div>
    </div>
  )
}
