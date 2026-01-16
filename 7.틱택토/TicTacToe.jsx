import React, {useEffect, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
  switch(action.type) {   // action.type = 액션의 이름이므로 위와 같이(SET_WINNER) 변수로 따로 빼놓는게 좋음
    // case 'SET_WINNER' :
    // 우승자 결정 액션
    case SET_WINNER :
      //state.winner = action.winner; (사용 X)
      return {
        ...state,
        winner: action.winner,
      };
    // 셀 클릭 액션
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    // 턴 변경 액션
    case CHANGE_TURN : {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    // 게임 초기화
    case RESET_GAME : {
      return {
        ...state,
        turn: 'O',
        tableData: [['', '', ''], ['', '', ''], ['', '', '']],
        recentCell: [-1, -1],
      }
    }
    default :
      return state;
  }
};

// Td.jsx에서 클릭 이벤트 -> Tr.jsx -> Table.jsx -> TicTacToe.jsx로 데이터 전달해야 하는 방식.
const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // const [winner, setwinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => {
    // dispatch({type: 'SET_WINNER', winner: 'O' });  //dispatch 안에 들어가는 부분을 action이라 말함.
                                                      // action을 실행(디스패치)할 때마다 reduver 실행됨
    dispatch({ type: SET_WINNER, winner: 'O' });   // 변수로 따로 빼놓은 액션명 활용
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0) return;

    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell);
    if(win) { // 승리 시
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESET_GAME});
    } else {
      let all = true;
      tableData.forEach((row) => { //무승부 검사
        row.forEach((cell) => {
          if(!cell) {
            all = false;
          }
        });
      });
      if(all) {
        // dispatch({type: SET_WINNER, winner: null});
        dispatch({type: RESET_GAME});
      } else {
        dispatch({type: CHANGE_TURN});
      }
    }
  }, [recentCell]);

  return(
      <>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
        {winner && <div>{winner}님의 승리</div>}
      </>
  )
};

export default TicTacToe;