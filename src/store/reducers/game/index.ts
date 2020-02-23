import { createReducer } from 'typesafe-actions';
import { GameState } from 'store/state/game';
import {
    setActive,
    icrementScore,
    resetScore,
    setGameLost,
} from 'store/actions/game';

const initialGameState: GameState = {
    active: false,
    score: 0,
    lost: false,
};

const game = createReducer(initialGameState)
    .handleAction(setActive, (state, { payload: active }) => ({
        ...state,
        active,
    }))
    .handleAction(setGameLost, (state, { payload: lost }) => ({
        ...state,
        lost,
    }))
    .handleAction(icrementScore, (state) => ({
        ...state,
        score: state.score + 1,
    }))
    .handleAction(resetScore, (state) => ({
        ...state,
        score: 0,
    }));

export { game };
