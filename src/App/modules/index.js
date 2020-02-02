// combine reducer - 리듀서를 모두 합친다
import { combineReducers } from "redux";

// reducer
import GameState from "./GameState";
import GameResult from "./GameResult";

export default combineReducers({
    GameState, GameResult
})
