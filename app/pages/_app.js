import Layout from "@/Components/Layout/Layout";
import "../styles/global.css";

function App({ Component, pageprops}) {
  return (
    <Layout>
      <Component {...pageprops}/>
    </Layout>
  );
}

export default App;
