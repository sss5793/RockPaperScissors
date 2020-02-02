import { handleActions } from "redux-actions";
import produce from "immer";

import { GameResult } from './GameResult';

// 액션 타입 정의
const PENDING = 'GameState/PENDING' ;
const READY = 'GameState/READY' ;
const START = 'GameState/START' ;
const RESTART = 'GameState/RESTART' ;
const END = 'GameState/END' ;

// 액션 생성 함수 정의
export const GameReady = () => ({ type: READY }) ;
export const GameStart = (data) => ({ type: START, payload : {data : {...data}} }) ;
export const GameReStart = (game,set) => {
    return async (dispatch) => {
        let data = {
            setRes : set,
            gameRes : game,
        };
        dispatch({ type: RESTART, payload: data });
    }
};
export const GameEnd = (user,computer) => {
    return async (dispatch) => {
        let res = '';
        console.log(user,computer);
        if(computer === 0){
            if(user === 'Rock'){
                res = 'WIN';
            }else if(user === 'Paper'){
                res = 'LOSE';
            }else {
                res = 'DRAW';
            }
        }else if(computer === 1){
            if(user === 'Paper'){
                res = 'WIN';
            }else if(user === 'Scissors'){
                res = 'LOSE';
            }else {
                res = 'DRAW';
            }
        }else {
            if(user === 'Scissors'){
                res = 'WIN';
            }else if(user === 'Rock'){
                res = 'LOSE';
            }else {
                res = 'DRAW';
            }
        }

        if(!user){
            res = 'LOSE';
        }

        dispatch(GameResult(res));

        dispatch({ type: END });
    }
};

// 초기 상태 정의
const initialState = {
    loading : false,
    gameState: 'READY',
    gameValue : {
        time : 5,
        game : 3,
        set : 3,
    },
    setRes : 1,
    gameRes : 1,
} ;

export default handleActions({
    [PENDING] : (state,actions) => produce(state,draft => {
        draft.loading = true;
    }),
    [READY] : (state,actions) => produce(state,draft => {
        draft.gameState = 'READY';
        draft.gameValue = {
            time : 5,
            game : 3,
            set : 3,
        };
        draft.setRes = 1;
        draft.gameRes = 1;
    }),
    [START] : (state,actions) => produce(state,draft => {
        draft.gameState = 'START';
        draft.gameValue.time = Number(actions.payload.data.time);
        draft.gameValue.game = Number(actions.payload.data.game);
        draft.gameValue.set = Number(actions.payload.data.set);
    }),
    [RESTART] : (state,actions) => produce(state,draft => {
        draft.gameState = 'START';
        draft.setRes = actions.payload.setRes;
        draft.gameRes = actions.payload.gameRes;
    }),
    [END] : (state,actions) => produce(state,draft => {
        draft.gameState = 'END';
    }),
},initialState);
