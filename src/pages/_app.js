import '@/styles/globals.scss'
import '@/styles/home.scss'
import Layout from 'layout/Layout'

const App = ({ Component, pageProps }) => {
  // console.log = console.warn = console.error = function () {}; // for disabling all the consoles and warning
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
