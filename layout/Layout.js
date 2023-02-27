import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ContextWrapper from "context/ContextWrapper";

const Layout = ({ children }) => {
    return (
        <ContextWrapper>
            <Navbar />
            {children}
            <Footer />
        </ContextWrapper>
    )
}

export default Layout;