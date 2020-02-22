import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { State } from '../state';
import { settings } from './settings';
import { game } from './game';

export const rootReducer = combineReducers<State>({
    game,
    settings,
});

export type RootState = StateType<typeof rootReducer>;
