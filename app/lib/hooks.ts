import { useEffect, useRef } from "react";

export const useIntervalBy1s = (callback: () => void) => {
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
};
