import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { State } from '../state';

import { settings } from './settings';

export const rootReducer = combineReducers<State>({
    settings,
});

export type RootState = StateType<typeof rootReducer>;
