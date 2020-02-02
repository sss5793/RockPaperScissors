import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import produce from "immer";

import { GameEnd } from "../../modules/GameState";

import { Btn } from '../../components';
import { Img } from '../../assets';

const Layer = styled.div`
    display : flex;
    margin : 0 auto;
    align-items: center;
    justify-content : center;
`;

const TimeText = styled.p`
    font-weight : bold;
    color : black;
    font-size : 20px;
`;

const Name = styled.p`
    font-weight : bold;
    color : black;
    font-size : 50px;
    margin-right : 25px;
`;

export const Play = () => {
    const dispatch = useDispatch();
    const gameState = useSelector(state => state.GameState);
    const [timer,setTimer] = useState(gameState.gameValue.time);
    const [computerState,setComputerState] = useState(false);
    const [userValue,setUserValue] = useState('');
    const [ userValueState , setUserValueState ] = useState(
        {
            Scissors : false,
            Rock : false,
            Paper : false,
        });

    const game = gameState.gameRes;
    const set = gameState.setRes;
    const computerValue = Math.floor(Math.random() * 3);
    let timerAction, timeOutAction = null;

    const timerStart = () => {
        setTimer(state => {
            if(state < 1){
                clearInterval(timerAction);
                if(gameState.gameState !== 'END'){
                    dispatch(GameEnd(userValue,computerValue));
                }
                // game end
                return 0;
            }else {
                return state - 1;
            }
        });
    };

    const onClick = (name) => {
        setUserValue(name);

        setUserValueState({
            Scissors : false,
            Rock : false,
            Paper : false,
        });

        setUserValueState(value => produce(value, draft => {
            console.log(value,draft);
            draft[name] = !value[name];
        }));

        dispatch(GameEnd(name,computerValue));
    };

    const gameStart = () => {
        timerAction = setInterval(timerStart,1000);
        timeOutAction = setTimeout(()=>{
            setComputerState(true);
        },3000);
    };

    useEffect(() => {
        gameStart();
        return () => {clearInterval(timerAction);clearTimeout(timeOutAction)};
    },[]);

    return (
            <div className={'play'}>
                <h1>게임 시작!</h1>
                <TimeText>남은 시간 :  {timer}초</TimeText>
                <TimeText>{set}세트 {gameState.gameValue.game}판 중 {game}번째 판 / 총 {gameState.gameValue.set}세트 중 {set}번째 세트</TimeText>
                <Layer>
                    <Name>유저 : </Name>
                    <Btn.ImgBtn name={'Scissors'} img={Img.Scissors} status={userValueState.Scissors} onClick={()=>onClick('Scissors')}/>
                    <Btn.ImgBtn name={'Rock'} img={Img.Rock} status={userValueState.Rock} onClick={()=>onClick('Rock')}/>
                    <Btn.ImgBtn name={'Paper'} img={Img.Paper} status={userValueState.Paper} onClick={()=>onClick('Paper')}/>
                </Layer>
                <h1>VS</h1>
                <Layer>
                    <Name>컴퓨터 : </Name>
                    <h1>?</h1>
                </Layer>
                {
                    computerState  &&
                    <h3>컴퓨터는 패를 골랐습니다.</h3>
                }
            </div>
    );
};

