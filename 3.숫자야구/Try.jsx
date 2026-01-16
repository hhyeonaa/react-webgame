// import React, { Component } from "react";       // Component : 전체 렌더링됨
import React, { PureComponent, memo } from "react";       // Pureomponent : 전체 렌더링됨

// // class Try extends Component {
// class Try extends PureComponent {
//     state = {
//         counter: 0,
//         string: 'hello',
//         number: 1,
//         boolean: true,
//         object: {},
//         array: [],
//     };
//
//     onClick = () => {
//         this.setState({
//             array : [],
//         });
//     };
//
//     render() {
//         const {tryinfo} = this.props;
//         return(
//             // 과일 예제 테스트
//             // <li key={this.props.key}>
//             //     <b>{this.props.fruit}</b> - {this.props.taste}
//             //     <div>컨텐츠1</div>
//             //     <div>컨텐츠2</div>
//             //     <div>컨텐츠3</div>
//             //     <div>컨텐츠4</div>
//             // </li>
//
//             // 숫자야구
//             <li>
//                 <div>{tryinfo.try}</div>
//                 <div>{tryinfo.result}</div>
//             </li>
//         )
//     }
// }
//
// export default Try;



// Hooks로 전환
const Try = memo(({tryinfo}) => {
    const [result, setResult] = useState(tryinfo.result);

    const onclick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryinfo.try}</div>
            <div onClick={onclick}>{tryinfo.result}</div>
        </li>
    );
});

export default Try;