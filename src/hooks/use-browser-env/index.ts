interface IFirefoxWindow extends Window {
  InstallTrigger?: unknown;
}

interface IIEDocument extends Document {
  documentMode?: number;
}

interface IOperaWindow extends Window {
  opera?: unknown;
  opr?: {
    addons: unknown;
  };
}

interface ISafariWindow extends Window {
  safari?: {
    pushNotification?: unknown;
  };
}

const iOSPlatforms = [
  "iPad Simulator",
  "iPhone Simulator",
  "iPod Simulator",
  "iPad",
  "iPhone",
  "iPod",
];

const useBrowserEnv = () => {
  function isAndroid(): boolean {
    return !!window && /Android/.test(navigator.userAgent);
  }

  function isIE(): boolean {
    return !!window && !!(document as IIEDocument).documentMode;
  }

  function isIE10(): boolean {
    return !!window && (document as IIEDocument).documentMode === 10;
  }

  function isIE11(): boolean {
    return !!window && (document as IIEDocument).documentMode === 11;
  }

  function isIPad(): boolean {
    return (
      !!window &&
      navigator.userAgent.includes("Mac") &&
      "ontouchend" in document
    );
  }

  function isIPhone(): boolean {
    return !!window && navigator.userAgent.indexOf("iPhone") !== -1;
  }

  function isIOS(): boolean {
    return !!window && (iOSPlatforms.includes(navigator.platform) || isIPad());
  }

  function isIPod(): boolean {
    return !!window && navigator.userAgent.indexOf("iPod") !== -1;
  }

  function isMac(): boolean {
    return (
      !!window &&
      !isIPhone() &&
      !isIPad() &&
      !isIPod() &&
      navigator.platform.indexOf("Mac") !== -1
    );
  }

  function isOpera(): boolean {
    if (!window) return false;

    return (
      !!(window as IOperaWindow).opera ||
      (!!(window as IOperaWindow).opr &&
        !!(window as IOperaWindow).opr?.addons) ||
      navigator.userAgent.indexOf(" OPR/") >= 0
    );
  }

  function isChrome(): boolean {
    if (!window) return false;
    return (
      /Chrome/.test(navigator.userAgent) &&
      /Google Inc/.test(navigator.vendor) &&
      !isOpera()
    );
  }

  function isEdge(): boolean {
    return !!window && !isIE() && !!window.StyleMedia;
  }

  function isFirefox(): boolean {
    return (
      !!window &&
      typeof (window as IFirefoxWindow).InstallTrigger !== "undefined"
    );
  }

  function isRetina(): boolean {
    return !!window && window.devicePixelRatio > 1;
  }

  function isSafari(): boolean {
    const win = window as ISafariWindow;
    if (!win || !win.safari || !win.safari.pushNotification) return false;

    return (
      (win.safari.pushNotification as any).toString() ===
      "[object SafariRemoteNotification]"
    );
  }

  function isTouchScreen(): boolean {
    return !!window && "ontouchstart" in window;
  }

  function isWin(): boolean {
    return !!window && navigator.platform.indexOf("Win") !== -1;
  }

  function isWeiXin(): boolean {
    return !!window && /MicroMessenger/.test(navigator.userAgent);
  }

  return {
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
  };
};

export default useBrowserEnv;
