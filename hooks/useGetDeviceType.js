import { useState, useEffect } from "react";

function useGetDeviceType() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  let deviceType = "desktop";

  if (windowSize.width < 320) {
    deviceType = "mobile";
  } else if (windowSize.width < 768) {
    deviceType = "tablet";
  }
  return deviceType;
}

export default useGetDeviceType;
