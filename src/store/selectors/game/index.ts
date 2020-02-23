import { createSelector } from 'reselect';
import { State } from 'store/state';

const FPS = 60;
const GRID_ZISE = 20;

export const gameSelector = ({ game }: State) => game;

export const gameActiveSelector = createSelector(
    gameSelector,
    ({ active }) => active,
);

export const gameLostSelector = createSelector(
    gameSelector,
    ({ lost }) => lost,
);

export const defaultFPSSelector = () => FPS;

export const defaultGridSizeSelector = () => GRID_ZISE;
