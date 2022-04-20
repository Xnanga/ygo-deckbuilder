import { useState, useEffect } from "react";

const useScreenWidth = (sizeInPixels) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [setWidth]);

  return width > sizeInPixels;
};

export default useScreenWidth;
