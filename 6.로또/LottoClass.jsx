import React, { Component } from 'react'; // 클래스 컴포넌트
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

// 클래스 컴포넌트 ver
class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),  // 당첨 숫자들
        winBalls: [],
        bonus: null,  // 보너스 공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 500);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 3500); // 앞의 setTimeout이 다 끝난 후에 나오도록 시간으로 설정한다. (500 * 7)
    };

    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        if(this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
        if (prevState.winNumbers !== this.state.winNumbers) {
          console.log('로또 숫자를 생성합니다.')
        }
    }

    componentWillUnmount() {
      this.timeouts.forEach((v) => {
          clearTimeout(v);
      });
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),  // 당첨 숫자들
            winBalls: [],
            bonus: null,  // 보너스 공
            redo: false,
        });
        this.timeouts = [];
    }

    render() {
        const {winBalls, bonus, redo} = this.state;
        return(
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;
