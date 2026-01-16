// import React, { PureComponent } from 'react';        // 1. 클래스 컴포넌트
// import React, { useState, useRef } from 'react';  // 2. 함수 컴포넌트(Hook X)
import React, { memo } from 'react';              // 3. Higher order Component(고차 컴포넌트)

// 1. 클래스 컴포넌트
// class Ball extends PureComponent {
//   render() {
//     let background;
//     if (number <= 10) {
//       background = 'red';
//     } else if (number <= 20) {
//       background = 'orange';
//     } else if (number <= 30) {
//       background = 'yellow';
//     } else if (number <= 40) {
//       background = 'blue';
//     } else {
//       background = 'green';
//     }
//     return (
//         <div className="ball" style={{background}}>{number}</div>
//     );
//   }
// }

// 2. 함수 컴포넌트(Hook X)
// const Ball = ({ number }) => {
//   let background;
//   if (number <= 10) {
//     background = 'red';
//   } else if (number <= 20) {
//     background = 'orange';
//   } else if (number <= 30) {
//     background = 'yellow';
//   } else if (number <= 40) {
//     background = 'blue';
//   } else {
//     background = 'green';
//   }
//   return (
//       <div className="ball" style={{background}}>{number}</div>
//   );
// }

// 3. Higher order Component(고차 컴포넌트)
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }
  return (
      <div className="ball" style={{background}}>{number}</div>
  );
});

export default Ball;