import { useRef, useEffect } from 'react';

// useInterval(() => {
//     
// }, 1000);
function useInterval (callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
    return savedCallback.current;
}

export default useInterval;