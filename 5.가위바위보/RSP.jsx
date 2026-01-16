// import React, { Component } from 'react';           // 클래스 컴포넌트
import React, { useState, useRef, useEffect } from 'react';    // Hooks
import useInterval from './useInterval';    // 커스텀 Hook

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> (setState/prop 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
}

// Hooks(함수 컴포넌트) 방식
const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const [clickable, setClickable] = useState(true);

    // 커스텀 훅 사용으로 인해 생략
    // const interval = useRef();
    //
    // useEffect(() => {   //componentDidmount, componentDidUpdate 역할(1:1 대응 X)
    //     interval.current = setInterval(changeHand, 100);
    //     return () => {  // componentWillUnmount 역할
    //         clearInterval(interval.current);
    //     };
    // }, [imgCoord]);

    // 커스텀 훅 사용으로 아래와 같이 사용
    const [isRunning, setIsRunning] = useState(true);

    const changeHand = () => {
        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    useInterval(changeHand, isRunning ? 100 : null);    // setisRunning(false)로 하면 null되면서 손이 멈춤.

    const onClickBtn = (choice) => () => {
        if(!clickable) return;    // 클릭 불가능한 상태 시, 함수 실행 방지
        setClickable(false);

        // if(interval.current){
        //     clearInterval(interval.current);
        if(isRunning) {
            setIsRunning(false);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;
            if(diff === 0) {
                setResult('비겼습니다!');
            } else if([-1, 2].includes(diff)) {
                setResult('이겼습니다!');
                setScore((prevScore) => prevScore + 1);
            } else {
                setResult('졌습니다!');
                setScore((prevScore) => prevScore - 1);
            }
            setTimeout(() => {
                // interval.current = setInterval(changeHand, 100);
                setIsRunning(true);
                setClickable(true);
            }, 1000);
        }
    };

    return(
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
            <div>
                <button id="rock" className="btn" disabled={!clickable} onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" disabled={!clickable} onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" disabled={!clickable} onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

// 클래스 컴포넌트 방식
// class RSP extends Component {
//   state = {
//     result: '',
//     imgCoord: rspCoords.바위,
//     score: 0,
//     clickable: true,
//   };
//
//   interval;
//
//   changeHand = () => {
//       const {imgCoord} = this.state;
//       if(imgCoord === rspCoords.바위) {
//           this.setState({
//               imgCoord: rspCoords.가위,
//           });
//       } else if(imgCoord === rspCoords.가위) {
//           this.setState({
//               imgCoord: rspCoords.보,
//           });
//       } else if(imgCoord === rspCoords.보) {
//           this.setState({
//               imgCoord: rspCoords.바위,
//           });
//       }
//   };
//
//   componentDidMount() { // 첫 렌더링 성공 후, 여기서 비동기 요청 많이 함. (setState로 리렌더링 발생 시에는 실행 X)
//       this.interval = setInterval(this.changeHand, 100);
//   }
//
//   // shouldComponentUpdate(nextProps, nextState, nextContext) {
//   // }
//
//   componentDidUpdate() { // 리렌더링 후
//
//   }
//
//   componentWillUnmount() { // 컴포넌트가 제거되기 직전, 여기서 비동기 요청 정리 많이 함.
//     clearInterval(this.interval);
//   }
//
//   onClickBtn = (choice) => () => {
//       const {imgCoord, clickable} = this.state;
//
//       if(!clickable) return;    // 클릭 불가능한 상태 시, 함수 실행 방지
//
//       this.setState({   // 클릭 시 버튼 비활성화
//           clickable: false,
//       });
//
//       clearInterval(this.interval);
//       const myScore = scores[choice];
//       const cpuScore = scores[computerChoice(imgCoord)];
//       const diff = myScore - cpuScore;
//       if(diff === 0) {
//           this.setState({
//               result: '비겼습니다!',
//           });
//       } else if([-1, 2].includes(diff)) {
//           this.setState((prevState) => {
//               return {
//                   result: '이겼습니다!',
//                   score: prevState.score + 1,
//               };
//           });
//       } else {
//           this.setState((prevState) => {
//              return {
//                  result: '졌습니다!',
//                  score: prevState.score - 1,
//              };
//           });
//       }
//       setTimeout(() => {
//           this.interval = setInterval(this.changeHand, 100);
//           this.setState({   // 2초 뒤에 다시 게임 시작될 때 버튼 활성화
//               clickable: true,
//           });
//       }, 1000);
//   };
//
//   render() {
//     const {result, score, imgCoord, clickable} = this.state;
//     // this.setState({}); -> render() 안에서 setState 사용 시 무한하게 렌더링됨.
//     return (
//         <>
//           <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
//           <div>
//             <button id="rock" className="btn" disabled={!clickable} onClick={this.onClickBtn('바위')}>바위</button>
//             <button id="scissor" className="btn" disabled={!clickable} onClick={this.onClickBtn('가위')}>가위</button>
//             <button id="paper" className="btn" disabled={!clickable} onClick={this.onClickBtn('보')}>보</button>
//           </div>
//           <div>{result}</div>
//           <div>현재 {score}점</div>
//         </>
//     );
//   }
// }

export default RSP;