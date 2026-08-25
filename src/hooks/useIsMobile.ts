"use client";

import { useState, useEffect } from "react";

const DEFAULT_MOBILE_BREAKPOINT = 768;

export function useIsMobile(
  breakpoint: number = DEFAULT_MOBILE_BREAKPOINT
): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${breakpoint - 1}px)`
    );

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}
