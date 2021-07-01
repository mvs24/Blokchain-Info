import Home from "./pages/Home/Home";
import { BrowserRouter, Route } from "react-router-dom";
import BlockDetails from "./pages/BlockDetails/BlockDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/:hash" exact component={BlockDetails}></Route>
      </BrowserRouter>
    </>
  );
}

export default App;
