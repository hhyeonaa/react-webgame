import {useRef, useEffect} from 'react';

// const [isRunning, setIsRunning] = useState(true);
// useInterval(() => {
//      console.log('hello');
// }, isRunning ? 1000 : null);

// 1초 뒤에 가위
// 1.1초 뒤에 changeHand
// 2초 뒤에 바위
// 2.2초 뒤에 changeHand
// 3초 뒤에 보

// 정규 버전
// function useInterval(callback, delay) {
//     const savedCallback = useRef();
//
//     useEffect(() => {
//         savedCallback.current = callback;
//     });
//
//     useEffect(() => {
//         function tick() {
//             savedCallback.current();
//         }
//
//         if(delay !== null) {
//             let id = setInterval(tick, delay);
//             return () => clearInterval(id);
//         }
//     }, [delay]);
//
//     return savedCallback.current;
// }

// ========================================================

// 1초 뒤에 가위
// 1.1초 뒤에 changeHand
// 2.1초 뒤에 바위
// 2.2초 뒤에 changeHand
// 3.2초 뒤에 보

// 간소화 버전
function useInterval(callback, delay) {
    useEffect(() => {
        if(delay !== null) {
            let id = setInterval(callback, delay);
            return () => clearInterval(id);
        }
    }, [delay, callback]);

    return callback;
}

export default useInterval;