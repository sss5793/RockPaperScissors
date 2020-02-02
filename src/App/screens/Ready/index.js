import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {GameStart} from "../../modules/GameState";
import {Btn} from "../../components";

const Layer = styled.div`
    display : flex;
    margin : 0 auto;
    align-items: center;
    justify-content : center;
    
    > p {
        width : 120px;
        text-align : left;
    }
    
    > span {
        width : 50px;
        text-align : left;
        margin-left : 5px;
    }
`;

const Input = styled.input`
    width : 150px;
    height : 30px;
    font-size : 14px;
    text-align : right;
    padding : 0 10px;
`;

export const Ready = () => {
    const dispatch = useDispatch();
    const gameValueDefault = useSelector(state => state.GameState.gameValue);
    const [ gameValue, setGameValue ] = useState(gameValueDefault);

    const onChange = (e) => {
        e.persist();
        console.log(e.target);
        setGameValue(state=> ({...state,[e.target.name]:e.target.value}));
    };

    const gameStart = () => {
        const { time, game, set } = gameValue;
        if(time < 5 || game < 3 || set < 3){
            alert('시간은 5초 이상 판 수와 세트는 3 이상만 가능합니다.');
        }else {
            dispatch(GameStart(gameValue));
        }
    };

    return(
        <div className={'ready'}>
            <h1>가위 바위 보!</h1>
            <Layer>
                <p>시간 제한</p>
                <Input value={gameValue.time} name={'time'} onChange={onChange} type={'number'}/>
                <span>초</span>
            </Layer>
            <Layer>
                <p>1세트 판 수</p>
                <Input value={gameValue.game} name={'game'} onChange={onChange} type={'number'}/>
                <span>판</span>
            </Layer>
            <Layer>
                <p>총 세트 수</p>
                <Input value={gameValue.set} name={'set'} onChange={onChange} type={'number'}/>
                <span>세트</span>
            </Layer>
            <Btn.SimpleBtn name={'시작'} onClick={gameStart}/>
        </div>
    )
};
