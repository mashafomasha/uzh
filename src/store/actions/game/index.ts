import { createAction } from 'typesafe-actions';

export const setActive = createAction('game/setStatus')<boolean>();

export const setScore = createAction('game/setScore')<number>();
