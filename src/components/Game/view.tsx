import * as React from 'react';
import { Button } from 'antd';
import { SettingsState } from 'store/state/settings';
import { GameCanvas } from 'components/GameCanvas';
import { Point } from 'types/point';
import './styles.css';

type Props = SettingsState & {
    active: boolean;
    startGame: () => void;
    terminateGame: (score: number) => void;
};

type State = {
    score: number;

    headDeltaX: number;
    headDeltaY: number;

    snake: Point[];
    apple: Point;

    framesCount: number;
    framesToSkip: number;
};

export class View extends React.Component<Props, State> {
    private readonly gridSize = 20;
    private reqAnimationFrame: number | undefined;

    constructor(props: Props) {
        super(props);

        this.state = {
            score: 0,

            headDeltaX: this.gridSize,
            headDeltaY: 0,

            snake: [[5, 5]],
            apple: this.generateApple(),

            framesCount: 0,
            framesToSkip: this.calculateFramesToSkip(),
        };
    }

    componentDidUpdate(prevProps: Props) {
        const { active } = this.props;

        if (!prevProps.active && active) {
            this.reqAnimationFrame = requestAnimationFrame(() =>
                this.renderFrame(),
            );
        }

        if (prevProps.active && !active && this.reqAnimationFrame) {
            cancelAnimationFrame(this.reqAnimationFrame);
        }
    }

    private calculateFramesToSkip = () => {
        const { velocity } = this.props;

        return Math.round(60 / velocity);
    };

    private renderFrame = () => {
        const { framesCount, score, snake, framesToSkip } = this.state;

        this.reqAnimationFrame = requestAnimationFrame(() =>
            this.renderFrame(),
        );

        if (framesCount < framesToSkip) {
            this.setState({ framesCount: framesCount + 1 });
            return;
        }

        const nextHeadPosition = this.calculateHeadPosition();
        const shouldIncrementScore = this.checkApple(nextHeadPosition);
        const shouldTerminateGame = this.checkCollision(nextHeadPosition);

        if (shouldTerminateGame) {
            this.props.terminateGame(score);
        }

        this.setState({
            framesCount: 0,
            score: shouldIncrementScore ? score + 1 : score,
            snake: [
                nextHeadPosition,
                ...(shouldIncrementScore ? snake : snake.slice(0, -1)),
            ],
        });
    };

    private calculateHeadPosition = (): Point => {
        const { headDeltaX, headDeltaY, snake: cells } = this.state;
        const [headX, headY] = cells[0];
        const { rows, columns } = this.props;

        const newHeadX = this.calculateCoordinateWithScreenWrap(
            headX + headDeltaX,
            this.gridSize,
            columns * this.gridSize,
        );
        const newHeadY = this.calculateCoordinateWithScreenWrap(
            headY + headDeltaY,
            this.gridSize,
            rows * this.gridSize,
        );

        return [newHeadX, newHeadY];
    };

    private calculateCoordinateWithScreenWrap = (
        current: number,
        step: number,
        max: number,
        min: number = 0,
    ) => {
        let coordinate = current;

        if (coordinate < min) {
            coordinate = max - step;
        } else if (coordinate >= max) {
            coordinate = min;
        }

        return coordinate;
    };

    private checkApple = ([headX, headY]: Point) => {
        const [appleX, appleY] = this.state.apple;
        return appleX === headX && appleY === headY;
    };

    private checkCollision = ([headX, headY]: Point) => {
        const { snake } = this.state;
        return Boolean(
            snake.find(([cellX, cellY]) => cellX === headX && cellY === headY),
        );
    };

    private generateApple = (): Point => {
        // TODO:
        return [25, 25];
    };

    render() {
        const { active, startGame, rows, columns } = this.props;
        const { headDeltaX, headDeltaY, snake, apple } = this.state;

        return (
            <section>
                <Button type="primary" onClick={startGame} disabled={active}>
                    Играть
                </Button>
                <div className="Game">
                    <GameCanvas
                        columns={columns}
                        rows={rows}
                        gridSize={this.gridSize}
                        headDeltaX={headDeltaX}
                        headDeltaY={headDeltaY}
                        snake={snake}
                        apple={apple}
                    />
                </div>
            </section>
        );
    }
}
