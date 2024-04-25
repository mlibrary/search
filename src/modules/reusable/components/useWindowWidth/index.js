import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

export default useWindowWidth;
