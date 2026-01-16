import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';     // Hooks
import Ball from './Ball';


// 숫자 6 + 1개 뽑는 함수
function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1) [0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}


// Hooks ver
const Lotto = () => {
    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];  // 이 형태가 timeouts에 직접적인 변화를 주므로 useEffect에 영향 O
    }, [winNumbers]);

    // componentDidMount만 비동기 처리하고 싶은 경우
    useEffect(() => {
        // ajax
    }, []);

    // componentDidUpdate만 비동기 처리하고 싶은 경우
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else {
            // ajax
        }
    });

    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {    // 배열 내 한 요소의 변화라 useEffect에 영향 X
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 500);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 3500);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 빈 배열([])이면 componentDidMount와 같이 사용됨.
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} onClick={onClickRedo} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}




export default Lotto;