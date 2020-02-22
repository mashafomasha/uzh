import { createAction } from 'typesafe-actions';

export const setRows = createAction('settings/setRows')<number>();

export const setColumns = createAction('settings/setColumns')<number>();

export const setVelocity = createAction('settings/setVelocity')<number>();
