import { handleActions } from "redux-actions";
import produce from "immer";

// 액션 타입 정의
const PENDING = 'GameResult/PENDING' ;
const GAME_WIN = 'GameResult/GAME_WIN' ;
const GAME_LOSE = 'GameResult/GAME_LOSE' ;
const GAME_DRAW = 'GameResult/GAME_DRAW' ;
const SET_WIN = 'GameResult/SET_WIN' ;
const SET_LOSE = 'GameResult/SET_LOSE' ;
const SET_DRAW = 'GameResult/SET_DRAW' ;
const SET_RESET = 'GameResult/SET_RESET' ;
const GAME_RESET = 'GameResult/GAME_RESET' ;
const RESULT = 'GameResult/RESULT' ;

// 액션 생성 함수 정의
export const GameResult = (res) => {
    return async (dispatch) => {
        dispatch({type : PENDING});
        console.log(res);
        if(res === 'WIN'){
            dispatch({type : GAME_WIN});
        }else if(res === 'LOSE'){
            dispatch({type : GAME_LOSE});
        }else{
            dispatch({type : GAME_DRAW});
        }
    };
};

export const SetResult = (res,userSet,set) => {
    return async (dispatch) => {
        dispatch({type : PENDING});
        console.log(res);
        if(res === 'WIN'){
            dispatch({type : SET_WIN});
        }else if(res === 'LOSE'){
            dispatch({type : SET_LOSE});
        }else{
            dispatch({type : SET_DRAW});
        }

        if(userSet === set){
            dispatch({type : RESULT});
        }
    };
};

export const SetInit = () => ({type : SET_RESET});
export const GameInit = () => ({type : GAME_RESET});

// 초기 상태 정의
const initialState = {
    loading : false,
    gameResState: '',
    setResState: '',
    gameWin : 0,
    gameLose : 0,
    setWin : 0,
    setLose : 0,
    result : '',
} ;

export default handleActions({
    [PENDING] : (state,actions) => produce(state,draft => {
        draft.loading = true;
    }),
    [GAME_WIN] : (state,actions) => produce(state,draft => {
        draft.gameResState = 'WIN';
        draft.gameWin = state.gameWin + 1;
        draft.loading = false;
    }),
    [GAME_LOSE] : (state,actions) => produce(state,draft => {
        draft.gameResState = 'LOSE';
        draft.gameLose = state.gameLose + 1;
        draft.loading = false;
    }),
    [GAME_DRAW] : (state,actions) => produce(state,draft => {
        draft.gameResState = 'DRAW';
        draft.loading = false;
    }),
    [SET_WIN] : (state,actions) => produce(state,draft => {
        draft.setResState = 'WIN';
        draft.setWin = state.setWin + 1;
        draft.loading = false;
    }),
    [SET_LOSE] : (state,actions) => produce(state,draft => {
        draft.setResState = 'LOSE';
        draft.setLose = state.setLose + 1;
        draft.loading = false;
    }),
    [SET_DRAW] : (state,actions) => produce(state,draft => {
        draft.setResState = 'DRAW';
        draft.loading = false;
    }),
    [SET_RESET] : (state,actions) => produce(state,draft => {
        draft.gameResState = '';
        draft.gameWin = 0;
        draft.gameLose = 0;
    }),
    [GAME_RESET] : (state,actions) => produce(state,draft => {
        draft.setResState = '';
        draft.setWin = 0;
        draft.setLose = 0;
    }),
    [RESULT] : (state,actions) => produce(state,draft => {
        if(state.setWin > state.setLose){
            draft.result = 'WIN';
        }else if(state.setWin === state.setLose){
            draft.result = 'DRAW';
        }else {
            draft.result = 'LOSE';
        }
    }),
},initialState);
