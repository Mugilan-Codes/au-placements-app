import {useEffect, useRef} from 'react';

// ? https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay = 1000) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
