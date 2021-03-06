import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { setActive, icrementScore, setGameLost } from 'store/actions/game';
import {
    gameActiveSelector,
    defaultFPSSelector,
    defaultGridSizeSelector,
} from 'store/selectors/game';
import { settingsSelector } from 'store/selectors';
import { View } from './view';

const mapStateToProps = createSelector(
    settingsSelector,
    gameActiveSelector,
    defaultFPSSelector,
    defaultGridSizeSelector,
    ({ rows, columns, velocity }, active, fps, gridSize) => ({
        active,
        gridSize,
        fieldHeigth: rows * gridSize,
        fieldWidth: columns * gridSize,
        framesToSkipCount: Math.round(fps / velocity),
    }),
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onAppleEncounter: () => dispatch(icrementScore()),
    onObstacleEncounter: () => {
        dispatch(setActive(false));
        dispatch(setGameLost(true));
    },
});

export const Game = connect(mapStateToProps, mapDispatchToProps)(View);
