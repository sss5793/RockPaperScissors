import React, {useState, useEffect}from 'react';

import { useSelector, useDispatch } from "react-redux";

import { GameReady, GameReStart } from "../../modules/GameState";
import { SetInit, SetResult, GameInit, End } from "../../modules/GameResult";

import { Btn } from '../../components';

export const Result = () => {
    const dispatch = useDispatch();
    const gameState = useSelector(state => state.GameState);
    const gameResult = useSelector(state => state.GameResult);
    const [isSetResult,setIsSetResult] = useState(false);
    const [isGameResult,setIsGameResult] = useState(false);


    console.log(gameState);
    const reStart = () => {
        let gameNum, setNum;

        if(gameState.gameRes < gameState.gameValue.game){
            gameNum = gameState.gameRes + 1;
            setNum = gameState.setRes;
        }else{
            gameNum = 1;
            dispatch(SetInit());
            if(gameState.setRes < gameState.gameValue.set){
                setNum = gameState.setRes + 1;
            }else{
                setNum = 1;
            }
        }

        dispatch(GameReStart(gameNum, setNum));
    };

    const setEndActions = () => {
        // 판 종료
        if(gameState.gameRes === gameState.gameValue.game){
            setIsSetResult(true);
            let res = '';
            // 한 세트 결과
            if(gameResult.gameWin > gameResult.gameLose){
                res = 'WIN';
            }else if(gameResult.gameWin === gameResult.gameLose){
                res = 'DRAW';
            }else {
                res = 'LOSE';
            }
            dispatch(SetResult(res,gameState.setRes,gameState.gameValue.set));

            // 게임 종료
            if(gameState.setRes === gameState.gameValue.set && !gameResult.loading){
                setIsGameResult(true);
            }
        }
    };

    const gameExit = () => {
        dispatch(SetInit());
        dispatch(GameInit());
        dispatch(GameReady());
    };

    useEffect(()=>{
        setEndActions();
    },[]);

    return (
        <div className={'result'}>
            {
                gameResult.loading ?
                    <div>결과 집계중..</div>
                    :
                    <div>
                        <h1>게임 결과</h1>
                        <p>게임 결과 - {gameResult.gameResState}</p>
                        <p>현재 스코어 - {gameState.setRes}세트 {gameResult.gameWin}승 {gameResult.gameLose}패</p>
                        {
                            isSetResult &&
                            <p>{gameState.setRes}세트 {gameResult.setResState}</p>
                        }
                        {
                            !isGameResult &&
                            <Btn.SimpleBtn name={'다음판 시작'} onClick={reStart}/>
                        }
                        <Btn.SimpleBtn name={!isGameResult ? '그만하기' : '처음으로'} onClick={gameExit}/>
                        {
                            isGameResult && !gameResult.loading &&
                            <div>
                                <p>총 {gameState.gameValue.set}세트 중 {gameResult.setWin}승 {gameResult.setLose}패</p>
                                <p>사용자 {gameResult.result}</p>
                            </div>
                        }
                    </div>
            }
        </div>
    );
};

