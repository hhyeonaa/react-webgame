const React = require('react');
const { useState, useRef } = React;


// 클래스 컴포넌트(주석) -> Hooks 함수 교체
// class WordRelay extends Component {
//   state = {
//     word: '시작',
//     value: '',
//     result: '',
//   };
// class WordRelay = () => {
const WordRelay = () => {
  const [word, setWord] = useState('시작');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  // input;
  // onRefInput = (c) => {
  //   this.input = c;
  // };
  const inputRef = useRef(null);

  // onSubmitForm = (e) => {
  //   e.preventDefault();
  //   if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
  //     this.setState({
  //       result: '딩동댕',
  //       word: this.state.value,
  //       value: '',
  //     });
  //     this.input.focus();
  //   } else {
  //     this.setState({
  //       result: '땡',
  //       value: '',
  //     });
  //     this.input.focus();
  //   }
  // };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  // onChangeInput = (e) => {
  //   this.setState({ value: e.target.value });
  // };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };



  // render() {
    return (
      <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="wordInput">글자를 입력하세요. </label>
          <input type="text" ref={inputRef} value={value} onChange={onChangeInput} />
          <button>입력!</button>
          <div>{result}</div>
        </form>
      </>
    );
  // }
}

module.exports = WordRelay;
