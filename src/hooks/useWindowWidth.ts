import { useEffect, useState } from "react";

export function useWindowWidth(): number {
  const isClient = typeof window !== "undefined";
  const getWidth = () => (isClient ? window.innerWidth : 1920);
  const [width, setWidth] = useState<number>(getWidth);

  useEffect(() => {
    if (!isClient) return;
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isClient]);

  return width;
}
