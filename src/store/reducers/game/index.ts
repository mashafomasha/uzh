import { createReducer } from 'typesafe-actions';
import { GameState } from 'store/state/game';
import { setActive, setScore } from 'store/actions/game';

const initialGameState: GameState = {
    active: false,
    score: 0,
};

const game = createReducer(initialGameState)
    .handleAction(setActive, (state, { payload: active }) => ({
        ...state,
        active,
    }))
    .handleAction(setScore, (state, { payload: score }) => ({
        ...state,
        score,
    }));

export { game };
