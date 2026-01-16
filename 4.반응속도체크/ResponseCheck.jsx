// import React, { Component } from 'react';
import React, {useState, useRef} from 'react';

// Hooks 사용 this 사용 X
const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeOut.current = setTimeout(()=> {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);    // 2~3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭한 경우
            clearTimeout(timeOut);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') {   // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요!');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    }

    return(
        <>
            <div
                id = "screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {(() => {
                if(result.length === 0) {
                    return null;
                } else {
                    return <>
                        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}>리셋</button>
                    </>
                }
            })()}
            {renderAverage()}
        </>
    );
}


// // 클래스 컴포넌트 사용
// class ResponseCheck extends Component {
//   state = {
//     state: 'waiting',
//     message: '클릭해서 시작하세요.',
//     result: [],
//   };
//
//   timeOut;
//   startTime;
//   endTime;
//
//   onClickScreen = () => {
//     const { state, message, result } = this.state;
//     if(state === 'waiting') {
//         this.setState({
//             state: 'ready',
//             messge: '초록색이 되면 클릭하세요',
//         });
//         this.timeOut = setTimeout(()=> {
//             this.setState({
//                 state: 'now',
//                 message: '지금 클릭',
//             });
//             this.startTime = new Date();
//         }, Math.floor(Math.random() * 1000) + 2000);    // 2~3초 랜덤
//     } else if (state === 'ready') { // 성급하게 클릭한 경우
//         clearTimeout(this.timeOut);
//         this.setState({
//             state: 'waiting',
//             message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
//         });
//     } else if (state === 'now') {   // 반응속도 체크
//         this.endTime = new Date();
//         this.setState((prevSate) => {
//             return {
//                 state: 'waiting',
//                 message: '클릭해서 시작하세요!',
//                 result: [...prevSate.result, this.endTime - this.startTime],
//             }
//         })
//     }
//   };
//
//   onReset = () => {
//       this.setState({
//           result: [],
//       });
//   }
//
//   renderAverage = () => {   // 현재 함수로 빼놨지만 아예 새로운 컴포넌트로 분리하는 것이 좋음.
//       const { result } = this.state;
//       return result.length === 0
//           ? null
//           : <>
//             <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
//             <button onClick={this.onReset}>리셋</button>
//           </>
//   };
//
//   render() {
//       const { state, message } = this.state;        // 구조분해로 this.state 생략 가능
//     return (
//         <>
//           <div
//             id="screen"
//             className={state}
//             onClick={this.onClickScreen}
//           >
//             {message}
//           </div>
//             {/*{this.state.result.length === 0
//                 : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>} */}
//             {this.renderAverage()}
//         </>
//     )
//   }
// }
//
export default ResponseCheck;