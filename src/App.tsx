import React, {
  HashRouter,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";

import useAntiShakeDemo from "./demo/use-anti-shake";

function App() {
  return (
    <HashRouter>
      <Link to="use-anti-shake">防抖</Link>
      <Switch>
        <Route path="/use-anti-shake" component={useAntiShakeDemo} />

        <Redirect to="/use-anti-shake" />
      </Switch>
    </HashRouter>
  );
}

export default App;
