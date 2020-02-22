import { createReducer } from 'typesafe-actions';
import { SettingsState } from 'store/state/settings';
import { setRows, setColumns, setVelocity } from 'store/actions/settings';

const initialSettingsState: SettingsState = {
    rows: 60,
    columns: 65,
    velocity: 20,
};

const settings = createReducer(initialSettingsState)
    .handleAction(setRows, (state, { payload: rows }) => ({ ...state, rows }))
    .handleAction(setColumns, (state, { payload: columns }) => ({
        ...state,
        columns,
    }))
    .handleAction(setVelocity, (state, { payload: velocity }) => ({
        ...state,
        velocity,
    }));

export { settings };
