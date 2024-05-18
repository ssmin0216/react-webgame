import { useRef, useEffect } from 'react';

// 실제 실행할 코드
// const [isRunning, setIsrunning] = useState(true);
// useInterval(() => {
//     console.log('hello');
// }, isRunning ? 1000 : null);

// 실제 실행할 코드를 savedCallback이라는 ref에 저장함.
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