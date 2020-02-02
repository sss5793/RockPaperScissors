import React from 'react';
import { useSelector } from "react-redux";

import { Ready } from '../Ready';
import { Play } from "../Play";
import { Result } from "../Result";

export const Home = () => {
    const gameState = useSelector(state => state.GameState.gameState);
    return (
        <div className={'App'}>
            {
                gameState === 'READY' ?
                    <Ready/>
                    : gameState === 'START' ?
                    <Play/>
                    :
                    <Result/>
            }
        </div>
    );
};


