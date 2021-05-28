import GlobalStyle from "../src/style/global";
import { Switch, Route } from "react-router-dom";
import Upload from "./components/upload";

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route to="/" exact>
          <Upload />
        </Route>
      </Switch>
    </>
  );
}

export default App;
