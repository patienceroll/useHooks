import React, {
  HashRouter,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";

import useAntiShakeDemo from "./demo/use-anti-shake";
import useConutDemo from "./demo/use-count";
import useBrowserEnvDemo from "./demo/use-browser-env";

function App() {
  return (
    <HashRouter>
      <div style={{ display: "flex" }}>
        <div style={{ flexShrink: 0, width: 100, textAlign: "center" }}>
          <li>
            <Link to="use-anti-shake">防抖</Link>
          </li>
          <li>
            <Link to="use-count">计时</Link>
          </li>
          <li>
            <Link to="use-browser-env">浏览器环境</Link>
          </li>
        </div>

        <div style={{ flex: 1, backgroundColor: "#eee", padding: 20 }}>
          <Switch>
            <Route path="/use-anti-shake" component={useAntiShakeDemo} />
            <Route path="/use-count" component={useConutDemo} />
            <Route path="/use-browser-env" component={useBrowserEnvDemo} />
            <Redirect to="/use-anti-shake" />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
