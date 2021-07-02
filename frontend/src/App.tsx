import Home from "./pages/Home/Home";
import { BrowserRouter, Route } from "react-router-dom";
import BlockDetails from "./pages/BlockDetails/BlockDetails";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/:hash" exact component={BlockDetails}></Route>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
