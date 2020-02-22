import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button } from 'antd';
import { createStructuredSelector, createSelector } from 'reselect';
import { setActive } from 'store/actions/game';
import { gameSelector } from 'store/selectors/game';

const mapStateToProps = createSelector(
    gameSelector,
    createStructuredSelector({
        disabled: ({ active }) => active,
    }),
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onClickStart: () => dispatch(setActive(true)),
});

type GameProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ disabled, onClickStart }: GameProps) => (
    <section>
        <Button type="primary" onClick={onClickStart} disabled={disabled}>
            Играть
        </Button>
        <div className="Game">игровое поле</div>
    </section>
));
