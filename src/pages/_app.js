import "@/styles/globals.scss";
import "@/styles/home.scss";
import Layout from "layout/Layout";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
