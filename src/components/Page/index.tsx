import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { gameActiveSelector } from 'store/selectors';
import { setActive, resetScore } from 'store/actions/game';
import { View } from './view';

const mapStateToProps = createSelector(gameActiveSelector, (active) => ({
    active,
}));

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStartGame: () => {
        dispatch(resetScore());
        dispatch(setActive(true));
    },
});

export const Page = connect(mapStateToProps, mapDispatchToProps)(View);
