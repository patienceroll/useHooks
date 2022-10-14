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
import useSpliceFile from "./demo/use-splice-file";

function App() {
  return (
    <HashRouter>
      <div style={{ display: "flex" }}>
        <ul style={{ flexShrink: 0, width: 200, textAlign: "left" }}>
          <li><Link to="use-anti-shake">防抖</Link></li>
          <li> <Link to="use-count">计时</Link></li>
          <li><Link to="use-browser-env">浏览器环境</Link></li>
          <li><Link to="use-splice-file">文件分片</Link></li>
        </ul>

        <div style={{ flex: 1, backgroundColor: "#eee", padding: 20 }}>
          <Switch>
            <Route path="/use-anti-shake" component={useAntiShakeDemo} />
            <Route path="/use-count" component={useConutDemo} />
            <Route path="/use-browser-env" component={useBrowserEnvDemo} />
            <Route path="/use-splice-file" component={useSpliceFile} />
            <Redirect to="/use-anti-shake" />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
