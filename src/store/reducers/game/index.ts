import { createReducer } from 'typesafe-actions';
import { GameState } from 'store/state/game';
import { setActive, icrementScore, resetScore } from 'store/actions/game';

const initialGameState: GameState = {
    active: false,
    score: 0,
};

const game = createReducer(initialGameState)
    .handleAction(setActive, (state, { payload: active }) => ({
        ...state,
        active,
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
