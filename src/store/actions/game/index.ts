import { createAction } from 'typesafe-actions';

export const setActive = createAction('game/setActive')<boolean>();

export const setScore = createAction('game/setScore')<number>();
