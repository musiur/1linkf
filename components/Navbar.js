
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const Router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div style={{ zIndex: "9999" }} className="sticky top-0 overflow-hidden">
      <ul className={`flex flex-col md:hidden items-center justify-start gap-7 text-[18px] text-[#0891B2] shadow-lg py-8 ${openMenu ? "translate-y-0 h-auto flex" : "-translate-y-[1000px] h-0 hidden"} transition easin-in-out duration-300 z-0 bg-[#F9FAFB]`}>
        <li className="flex flex-col md:hidden items-center justify-end gap-5">
          <Button type="white" onClick={() => Router.push("/signin")}>
            Sign in
          </Button>
          <Button onClick={() => Router.push("/signup")}>Sign up</Button>
        </li>
        <li className="cursor-pointer">
          <a href="#discover">Discover</a>
        </li>
        <li className="cursor-pointer">
          <a href="#how_it_works">How it works</a>
        </li>
        <li className="cursor-pointer">
          <a href="#pricing">Pricing</a>
        </li>
        <li className="cursor-pointer">
          <a href="#faq">FAQ</a>
        </li>
      </ul>
      <nav className="bg-[#F9FAFB]">
        <div className="flex items-center justify-between gap-5 p-[23px]">
          <div className="flex items-center justify-start gap-[48px]">
            <button className="h-[60px] pl-1 pr-2 flex items-center justify-center bg-gradient-to-b from-[#202D3D] to-[#0B91AF] text-[20px] font-bold leading-[28px] text-white cursor-pointer" onClick={() => Router.push("/")}>
              1link
            </button>
            <ul className="hidden md:flex items-center justify-start gap-7 text-[18px] text-[#0891B2]">
              <li className="cursor-pointer">
                <a href="#discover">Discover</a>
              </li>
              <li className="cursor-pointer">
                <a href="#how_it_works">How it works</a>
              </li>
              <li className="cursor-pointer">
                <a href="#pricing">Pricing</a>
              </li>
              <li className="cursor-pointer">
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-end gap-5">
            <div className="hidden md:flex items-center justify-end gap-5">
              <Button type="white" onClick={() => Router.push("/signin")}>
                Sign in
              </Button>
              <Button onClick={() => Router.push("/signup")}>Sign up</Button>
            </div>
            <div className="flex md:hidden cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
              {
                openMenu ? <CloseIcon /> : <MenuIcon />
              }
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;


const MenuIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>


  )
}

const CloseIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

  )
}
