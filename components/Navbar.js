
import { UserContext } from "context/UserProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const Router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const { userdata, setUserdata } = useContext(UserContext);
  const [openSubmenu, setOpenSubmenu] = useState(false);

  useEffect(() => {
    setOpenMenu(false);
  }, [Router.pathname])

  const SignOut = () => {
    setUserdata({});
    // sessionStorage.removeItem("access_token");
    sessionStorage.clear();
    Router.push("/")
  }
  return (
    <div style={{ zIndex: "9999" }} className="sticky top-0">
      <ul className={`flex flex-col md:hidden items-center justify-start gap-7 text-[18px] text-[#0891B2] shadow-lg  ${openMenu ? "translate-x-0 h-auto py-8" : "-translate-x-[100%] h-0 p-0"} transition easin-in-out duration-300 z-0 bg-[#F9FAFB]`}>
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
      <nav className="bg-[#F9FAFB] relative">
        <div className="flex items-center justify-between gap-5 p-[10px] lg:p-[23px]">
          <div className="flex items-center justify-start gap-[48px]">
            <button className="h-[60px] pl-1 pr-2 flex items-center justify-center bg-gradient-to-b from-[#202D3D] to-[#0B91AF] text-[20px] font-bold leading-[28px] text-white cursor-pointer" onClick={() => Router.push("/")}>
              1link
            </button>
            {
              Router.pathname === "/" ? <ul className="hidden md:flex items-center justify-start gap-7 text-[18px] text-[#0891B2]">
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
              </ul> : null
            }
          </div>
          <div className="flex items-center justify-end gap-5">
            {
              !userdata.username ? <div className="hidden md:flex items-center justify-end gap-5">
                <Button type="white" onClick={() => Router.push("/signin")}>
                  Sign in
                </Button>
                <Button onClick={() => Router.push("/signup")}>Sign up</Button>
              </div> :
                <div className="flex items-center justify-end gap-1 cursor-pointer" onClick={() => setOpenSubmenu(!openSubmenu)}>
                  <UserIcon />{userdata.username}

                </div>
            }
            <div className="flex md:hidden cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
              {
                openMenu ? <CloseIcon /> : <MenuIcon />
              }
            </div>
          </div>
        </div>
        {
          openSubmenu ? <div className="absolute top-[80px] right-0 min-w-[200px] border flex flex-col items-end justify-start gap-1 rounded-md bg-white py-1 mr-5" onClick={() => setOpenSubmenu(false)}>
            <Link href="/dashboard/profile" className="hover:bg-gray-100 rounded-md w-full text-right cursor-pointer px-3 py-1">Profile</Link>
            <button onClick={SignOut} className="hover:bg-red-100 text-red-400 rounded-md w-full text-right cursor-pointer px-3 py-1">Sign out</button>
          </div> : null
        }
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

const UserIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
