import { createSelector } from 'reselect';
import { State } from 'store/state';

export const gameSelector = ({ game }: State) => game;

export const gameActiveSelector = createSelector(
    gameSelector,
    ({ active }) => active,
);
