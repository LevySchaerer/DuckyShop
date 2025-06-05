import Layout from "@/Components/Layout/Layout";
import "../styles/global.css";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageprops}/>
    </Layout>
  );
}

export default App;
