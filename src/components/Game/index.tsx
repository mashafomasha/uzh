import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { setActive } from 'store/actions/game';
import { gameActiveSelector } from 'store/selectors/game';
import { View } from './view';
import './styles.css';
import { settingsSelector } from 'store/selectors';

const mapStateToProps = createSelector(
    settingsSelector,
    gameActiveSelector,
    (settings, active) => ({
        ...settings,
        active,
    }),
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    startGame: () => dispatch(setActive(true)),
    terminateGame: () => dispatch(setActive(false)),
});

export const Game = connect(mapStateToProps, mapDispatchToProps)(View);
