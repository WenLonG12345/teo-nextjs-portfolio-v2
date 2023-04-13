import { useEffect, useMemo } from "react";
import { useState } from "react";

export enum ScreenSize {
  mobile = 450,
  sm = 600,
  md = 728,
  lg = 984,
  xl = 1080,
  "2xl" = 1336,
}

const checkScreenSize = (width: number) => {
  if (width >= ScreenSize["2xl"]) {
    return ScreenSize["2xl"];
  }

  if (width >= ScreenSize.xl) {
    return ScreenSize.xl;
  }

  if (width >= ScreenSize.lg) {
    return ScreenSize.lg;
  }

  if (width >= ScreenSize.md) {
    return ScreenSize.md;
  }

  if (width >= ScreenSize.sm) {
    return ScreenSize.sm;
  }

  // if(width >= ScreenSize.mobile && width < ScreenSize.sm) {
  //   return width;
  // }

  return ScreenSize.mobile;
};

const useScreenResponsive = () => {
  const [currentSize, setCurrentSize] = useState(ScreenSize["2xl"]);

  useEffect(() => {
    setCurrentSize(checkScreenSize(window.innerWidth));
  }, []);

  useEffect(() => {
    const handler = () => setCurrentSize(checkScreenSize(window.innerWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => currentSize, [currentSize]);
};

export default useScreenResponsive;
