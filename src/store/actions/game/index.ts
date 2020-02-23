import { createAction } from 'typesafe-actions';

export const setActive = createAction('game/setActive')<boolean>();

export const icrementScore = createAction('game/icrementScore')();

export const resetScore = createAction('game/resetScore')();
