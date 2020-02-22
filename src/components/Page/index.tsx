import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { gameActiveSelector } from 'store/selectors';
import { View } from './view';

export const Page = connect(
    createSelector(gameActiveSelector, (settingsDisabled) => ({
        settingsDisabled,
    })),
)(View);
