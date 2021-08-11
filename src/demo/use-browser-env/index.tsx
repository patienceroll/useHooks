import React from "react";

import useBrowserEnv from "../../hooks/use-browser-env";

const useBrowserEnvDemo = () => {
  const {
    isAndroid,
    isIE,
    isIE10,
    isIE11,
    isIPad,
    isIPhone,
    isIOS,
    isIPod,
    isMac,
    isOpera,
    isChrome,
    isEdge,
    isFirefox,
    isRetina,
    isSafari,
    isTouchScreen,
    isWin,
    isWeiXin,
  } = useBrowserEnv();

  return (
    <ul>
      <h2 style={{ color: "#ccc" }}>部分平台没有经过测试...</h2>
      <li>isAndroid:&emsp;{`${isAndroid()}`}</li>
      <li>isIE:&emsp;{`${isIE()}`}</li>
      <li>isIE10:&emsp;{`${isIE10()}`}</li>
      <li>isIE11:&emsp;{`${isIE11()}`}</li>
      <li>isIPad:&emsp;{`${isIPad()}`}</li>
      <li>isIPhone:&emsp;{`${isIPhone()}`}</li>
      <li>isIOS:&emsp;{`${isIOS()}`}</li>
      <li>isIPod:&emsp;{`${isIPod()}`}</li>
      <li>isMac:&emsp;{`${isMac()}`}</li>
      <li>isOpera:&emsp;{`${isOpera()}`}</li>
      <li>isChrome:&emsp;{`${isChrome()}`}</li>
      <li>isEdge:&emsp;{`${isEdge()}`}</li>
      <li>isFirefox:&emsp;{`${isFirefox()}`}</li>
      <li>isRetina:&emsp;{`${isRetina()}`}</li>
      <li>isSafari:&emsp;{`${isSafari()}`}</li>
      <li>isTouchScreen:&emsp;{`${isTouchScreen()}`}</li>
      <li>isWin:&emsp;{`${isWin()}`}</li>
      <li>isWeiXin:&emsp;{`${isWeiXin()}`}</li>
    </ul>
  );
};

export default useBrowserEnvDemo;
