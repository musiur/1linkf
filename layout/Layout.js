import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ContextWrapper from "context/ContextWrapper";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const Router = useRouter();

    return (
        <ContextWrapper>
            {!Router.pathname.includes("author") ? <Navbar /> : null}
            
            {children}
            {!Router.pathname.includes("dashboard") ? <Footer /> : null}
        </ContextWrapper>
    )
}

export default Layout;