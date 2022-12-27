import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export type NavBarParams = {
  /** 右上角菜单按钮的数据 */
  menuData: Taro.getMenuButtonBoundingClientRect.Rect;
  /** 获取到的系统信息 */
  systemInfo?: Taro.getSystemInfo.Result;
  /** ### 导航栏的高度,（如果不是自定义导航栏,导航栏下面的内容就是 page 的内容）
   * - 值是状态栏+按钮高度+按钮到导航栏的距离*2 */
  height: number;
  /** 按钮margin (按钮到导航栏的距离) */
  margin: number;
};

export default function useNavBar(): NavBarParams {
  const [menuData] = useState(() => Taro.getMenuButtonBoundingClientRect());
  const [systemInfo, setSystemInfo] = useState<Taro.getSystemInfo.Result>();

  function refeshSystemInfo() {
    Taro.getSystemInfo().then(setSystemInfo);
  }

  useEffect(refeshSystemInfo);

  const {
    /** 按钮距离顶部的高度 */
    top,
    /** 按钮的高度 */
    height: menuHeigt,
  } = menuData;
  const statusBarHeight = systemInfo ? systemInfo.statusBarHeight || 0 : 0;
  const margin = top - statusBarHeight;
  const height = statusBarHeight + margin * 2 + menuHeigt;

  return { menuData, systemInfo, height, margin };
}
