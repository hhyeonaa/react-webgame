import React, { Component, createRef } from 'react';
import Try from './Try';

// this.를 제거하고자 한다면 class 외부에 function으로 작성
function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const answer = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1) {
        const chosen = answer.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    // this.getNumbers()로 쓰고자 하는 경우 클래스 이내에 화살표함수로 작성
    // getNumbers = () => {
    //     const answer = [1,2,3,4,5,6,7,8,9];
    //     const array = [];
    //     for(let i = 0; i < 4; i += 1) {
    //         const chosen = answer.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    //         array.push(chosen);
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            value: '',
            answer: getNumbers(),
            tries: [],
        };
        // 기존 onSubmitForm, onChangeInput 메서드 화살표함수 대체하는 대신 this를 사용하지 못해 여기서 바인드시킴.
        // Babel에서는 this.bind 대신 화살표 함수로 대체해주는 역할로 자리잡음.
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    state = {
        result: '',
        value: '',
        answer: getNumbers(),   // ex: [1, 3, 5, 7]
        tries: [],  // push 사용 금지
    };

    // (데이터 전달 순서) : A(NumberBaseball.jsx = 부모) -> B(props)  -> C(Try.jsx = 자식)
    // B와 같이 불필요하게 전달 순서가 많아지는 경우를 최소화하기 위해 'nextContext' 사용
    // props의 진화형 => Context
    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }


    // this 사용하지 않는다면 화살표 함수 생략 가능
    // onSubmitForm = (e) => {
    onSubmitForm(e) {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')) {
            this.setState( {
                result: '홈런!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}],
            })
            alert('게임을 다시 시작합니다!');
            this.setState({
                value : '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        } else {
            const answerArray = this.state.value.split('') .map(v => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value : '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if(this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스크라이크, ${ball} 볼입니다.`}]
                });
                this.inputRef.current.focus();
            }
        }
    };

    // onChangeInput = (e) => {
    onChangeInput(e) {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };

    inputRef = createRef();

    // onInputRef = (c) => {
    //     this.inputRef = c;
    // };

    fruits = [
        { fruit: '사과', taste: '맛있다'}
        , { fruit: '바나나', taste: '달다'}
        , { fruit: '포도', taste: '시다'}
        , { fruit: '귤', taste: '새콤하다'}
        , { fruit: '감', taste: '떫다'}
        , { fruit: '배', taste: '시원하다'}
        , { fruit: '자몽', taste: '쓰다'}
    ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {/* 1차원 배열 방식 */}
                    {/*<li>사과</li>
                    <li>바나나</li>
                    <li>포도</li>
                    <li>귤</li>
                    <li>감</li>
                    {['사과', '바나나', '포도', '귤', '감', '배', '자몽'].map((v) => {
                        return <li>{v}</li>
                    })
                    }*/}

                    {/* 2차원 배열 방식 */}
                    {/*<li><b>사과</b> - 맛있다</li>
                    <li><b>바나나</b> - 달다</li>
                    <li><b>포도</b> - 시다</li>
                    <li><b>귤</b> - 새콤하다</li>
                    <li><b>감</b> - 떫다</li>
                    {[['사과', '맛있다']
                    , ['바나나', '달다']
                    , ['포도', '시다']
                    , ['귤', '새콤하다']
                    , ['감', '떫다']
                    , ['배', '시원하다']
                    , ['자몽', '쓰다']].map((v) => {
                       return <li><b>{v[0]}</b> - {v[1]}</li>
                    })
                    }*/}

                    {/* 객체 배열 방식 */}
                    {/*{[
                        { fruit: '사과', taste: '맛있다'}
                        , { fruit: '바나나', taste: '달다'}
                        , { fruit: '포도', taste: '시다'}
                        , { fruit: '귤', taste: '새콤하다'}
                        , { fruit: '감', taste: '떫다'}
                        , { fruit: '배', taste: '시원하다'}
                        , { fruit: '자몽', taste: '쓰다'}
                    ].map((v, i) => {
                            return (
                                <li key={v.fruit + i}><b>{v.fruit}</b> - {i}</li>
                            )
                        })
                    }*/}

                    {/* Try&props 사용 -> return 내부가 길어질 경우 try.jsx 이용해서 컴포넌트 분리 -> 가독성/재사용성 증가 */}
                    {/* {this.fruits.map((v, i) => {
                        return (
                            <Try key={v.fruit + i} fruit={v.fruit} taste={v.taste} />
                        )
                    })}*/}

                    {/* 실전 예제 */}
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 : ${v.try}`} tryinfo={v} index={i} />
                        )
                    })}
                </ul>
            </>
        );
    }
}

export const hello = 'hello';   // import { hello }
export const bye = 'bye';       // import { hello, bye }

// ES2015 모듈 (Node 모듈과 다름)
export default NumberBaseball;  // import NumberBaseball;
// module.exports와는 다른 개념

// const React = require('react');
// export.hello = 'hello';          // ES2015 모듈
// module.exports = NumberBaseball; // Node 모듈(CommonJS)







// // Hooks로 전환
// import React, { useState } from 'react';
// import Try from './Try';
// function getNumbers() {
//     const answer = [1,2,3,4,5,6,7,8,9];
//     const array = [];
//     for(let i = 0; i < 4; i += 1) {
//         const chosen = answer.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
//         array.push(chosen);
//     }
//     return array;
// }
//
// const NumberBaseball = () => {
//     const [result, setResult] = useState('');
//     const [value, setValue] = useState('');
//     const [answer, setAnswer] = useState(getNumbers);
//     const [tries, setTries] = useState([]);
//
//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         if(value === answer.join('')) {     // 답이 맞으면
//             setResult('홈런!');
//             setTries(([prevTries]) => {
//                 return [...prevTries, {try: value, result: '홈런!'}]
//             });
//             alert('게임을 다시 시작합니다!');
//             setValue('');
//             setAnswer(getNumbers);
//             setTries([]);
//         } else {                            // 답 틀렸으면
//             const answerArray = value.split('') .map(v => parseInt(v));
//             let strike = 0;
//             let ball = 0;
//             if(tries.length >= 9) {
//                 setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
//                 alert('게임을 다시 시작합니다!');
//                 setValue('');
//                 setAnswer(getNumbers);
//                 setTries([]);
//             } else {
//                 for (let i = 0; i < 4; i += 1) {
//                     if(answerArray[i] === answer[i]) {
//                         strike += 1;
//                     } else if(answer.includes(answerArray[i])) {
//                         ball += 1;
//                     }
//                 }
//                 setTries(([prevTries]) =>
//                     [...prevTries, { try: value, result: `${strike} 스크라이크, ${ball} 볼입니다.`}]);
//                 setValue('');
//             }
//         }
//     };
//
//     const onChangeInput = (e) => {
//         setValue(e.target.value);
//     };
//
//     return (
//         <>
//             <h1>{result}</h1>
//             <form>
//                 <input maxLength={4} value={value} onChange={onChangeInput} />
//             </form>
//             <div>시도 : {tries.length}</div>
//             <ul>
//                 {tries.map((v, i) => {
//                     return(
//                         <Try key={`${i + 1}차 시도 : `} tryinfo={v} />
//                     );
//                 })}
//             </ul>
//         </>
//     );
// }