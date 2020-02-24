import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { Result, Button, Icon, Alert } from 'antd';
import { gameSelector } from 'store/selectors';
import { setActive, resetScore, setGameLost } from 'store/actions/game';
import { Game } from 'components/Game';
import './styles.css';

type GameTabProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = createSelector(
    gameSelector,
    ({ score, lost: gameLost, active: gameActive }) => ({
        score,
        gameLost,
        gameActive,
    }),
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStartGame: () => {
        dispatch(setGameLost(false));
        dispatch(resetScore());
        dispatch(setActive(true));
    },
});

export const GameTab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(({ score, gameActive: disabled, gameLost, onStartGame }: GameTabProps) => (
    <>
        <div>
            <Alert
                className="Info"
                message="Управляй при помощи стрелок"
                type="info"
                closable
            />
            <Button type="primary" disabled={disabled} onClick={onStartGame}>
                Играть
            </Button>
        </div>
        <div className="Game">
            {gameLost && (
                <div className="GameLost">
                    <Result
                        icon={<Icon type="meh" />}
                        title={`Это всё. Ваш счёт: ${score}`}
                        extra={
                            <Button type="primary" onClick={onStartGame}>
                                Играть ещё
                            </Button>
                        }
                    />
                </div>
            )}
            <Game />
        </div>
    </>
));
