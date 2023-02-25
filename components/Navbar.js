
import { useRouter } from "next/router";
import Button from "./Button";

const Navbar = () => {
  const Router = useRouter();
  return (
    <nav className="">
      <div className="flex items-center justify-between gap-5 p-[23px]">
        <div className="flex items-center justify-start gap-[48px]">
          <button className="h-[60px] pl-1 pr-2 flex items-center justify-center bg-gradient-to-b from-[#202D3D] to-[#0B91AF] text-[20px] font-bold leading-[28px] text-white cursor-pointer" onClick={() => Router.push("/")}>
            1link
          </button>
          <ul className="flex items-center justify-start gap-7 text-[18px] text-[#0891B2]">
            <li className="cursor-pointer">
              <a to="#discover">Discover</a>
            </li>
            <li className="cursor-pointer">
              <a to="#how_it_works">How it works</a>
            </li>
            <li className="cursor-pointer">
              <a to="#pricing">Pricing</a>
            </li>
            <li className="cursor-pointer">
              <a to="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-end gap-5">
          <Button type="white" onClick={() => Router.push("/signin")}>
            Sign in
          </Button>
          <Button onClick={() => Router.push("/signup")}>Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
