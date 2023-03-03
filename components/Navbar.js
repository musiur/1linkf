
import { UserContext } from "context/UserProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import CloseIcon from "./icons/CloseIcon";
import MenuIcon from "./icons/MenuIcon";
import UserIcon from "./icons/UserIcon";

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
        {
          userdata.username ? <li className="flex flex-col gap-5">
            <Link href="/dashboard/profile" className="text-center">Profile</Link>
            <button onClick={SignOut} className="text-red-400 text-center">Sign out</button>
          </li> : <li className="flex flex-col md:hidden items-center justify-end gap-5">
            <Button type="white" onClick={() => Router.push("/signin")}>
              Sign in
            </Button>
            <Button onClick={() => Router.push("/signup")}>Sign up</Button>
          </li>
        }


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


