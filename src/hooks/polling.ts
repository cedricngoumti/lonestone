import { useEffect } from 'react';

const usePolling = (callback: () => void, waitTime: number) => {
  useEffect(() => {
    const timer = setInterval(() => callback(), waitTime);
    return () => {
      clearInterval(timer);
    };
  }, [callback]);
};

export default usePolling;