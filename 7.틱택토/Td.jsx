import React, { useCallback, useEffect, useRef, memo } from "react";
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = memo (({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log('td rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex === ref.current[0] && cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    console.log(cellData, ref.current[3]);
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if(cellData) return;

    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });   // dispatch로 state 값을 변화시키는 것이 비동기
  }, [cellData]);

  return (
      <td onClick={onClickTd}>{cellData}</td>
  )
});

export default Td;