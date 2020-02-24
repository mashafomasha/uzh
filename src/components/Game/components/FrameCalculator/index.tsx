import * as React from 'react';
import { Point } from 'types/point';

type FrameState = {
    applePoints: Point[];
    snakePoints: Point[];

    currentFramesCount: number;
};

type FrameProps = {
    active: boolean;
    framesToSkipCount: number;

    speedX: number;
    speedY: number;

    fieldWidth: number;
    fieldHeigth: number;
    gridSize: number;

    onAppleEncounter: () => void;
    onObstacleEncounter: () => void;

    children: (props: FrameState) => React.ReactNode;
};

export class FrameCalculator extends React.Component<FrameProps, FrameState> {
    private reqAnimationFrameId: number | undefined;

    constructor(props: FrameProps) {
        super(props);

        this.state = this.getBrandNewState();
    }

    componentDidUpdate(prevProps: FrameProps) {
        const { active, gridSize, fieldHeigth, fieldWidth } = this.props;

        if (!prevProps.active && active) {
            this.reqAnimationFrameId = requestAnimationFrame(
                this.requestAnimationFrame,
            );
        }

        if (prevProps.active && !active && this.reqAnimationFrameId) {
            cancelAnimationFrame(this.reqAnimationFrameId);

            // после отмены игры ставим в очередь задачу сброса состояния
            setTimeout(() => {
                this.setState(this.getBrandNewState());
            }, 0);
        }

        if (
            prevProps.fieldWidth !== fieldWidth ||
            prevProps.fieldHeigth !== fieldHeigth ||
            prevProps.gridSize !== gridSize
        ) {
            this.setState(this.getBrandNewState());
        }
    }

    componentWillUnmount() {
        if (this.reqAnimationFrameId) {
            cancelAnimationFrame(this.reqAnimationFrameId);
        }
    }

    private getBrandNewState = () => ({
        applePoints: [this.generateRandomPoint()],
        snakePoints: [this.generateRandomPoint()],

        currentFramesCount: 0,
    });

    private requestAnimationFrame = () => {
        const { currentFramesCount } = this.state;
        const { framesToSkipCount } = this.props;

        this.reqAnimationFrameId = requestAnimationFrame(
            this.requestAnimationFrame,
        );

        if (currentFramesCount < framesToSkipCount) {
            this.setState({ currentFramesCount: currentFramesCount + 1 });
            return;
        }

        this.updateNewFramePositions();
    };

    private updateNewFramePositions = () => {
        const { snakePoints, applePoints } = this.state;
        const { onAppleEncounter, onObstacleEncounter } = this.props;

        const newSnakeHeadPosition = this.calculateNewSnakeHeadPosition();

        const hasAppleEncounter = this.checkObstacleEncounter(
            newSnakeHeadPosition,
            applePoints,
        );
        if (hasAppleEncounter) {
            onAppleEncounter();
        }

        const hasObstacleEncounter = this.checkObstacleEncounter(
            newSnakeHeadPosition,
            snakePoints,
        );
        if (hasObstacleEncounter) {
            onObstacleEncounter();
        }

        try {
            const newApple = this.generateRandomPointWithRetiries(snakePoints);
            this.setState({
                currentFramesCount: 0,
                snakePoints: [
                    newSnakeHeadPosition,
                    ...(hasAppleEncounter
                        ? snakePoints
                        : snakePoints.slice(0, -1)),
                ],
                ...(hasAppleEncounter ? { applePoints: [newApple] } : null),
            });
        } catch {
            // все клетки заняты сообщаем о проблеме и обнуляем состояние
            onObstacleEncounter();
            this.setState(this.getBrandNewState());
        }
    };

    private calculateNewSnakeHeadPosition = (): Point => {
        const {
            speedX,
            speedY,
            gridSize,
            fieldWidth,
            fieldHeigth,
        } = this.props;
        const { snakePoints } = this.state;
        const [prevX, prevY] = snakePoints[0];

        const currentX = this.calculateCoordinateWithScreenWrap(
            prevX + speedX,
            gridSize,
            fieldWidth,
        );
        const currentY = this.calculateCoordinateWithScreenWrap(
            prevY + speedY,
            gridSize,
            fieldHeigth,
        );

        return [currentX, currentY];
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

    private checkObstacleEncounter = (
        [pointX, pointY]: Point,
        pointsToCheck: Point[],
    ) => {
        return Boolean(
            pointsToCheck.find(
                ([cellX, cellY]) => cellX === pointX && cellY === pointY,
            ),
        );
    };

    private getRandomInRange = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min)) + min;

    private generateRandomPoint = (): Point => {
        const { fieldHeigth, fieldWidth, gridSize } = this.props;

        const pointX =
            this.getRandomInRange(0, fieldWidth / gridSize) * gridSize;
        const pointY =
            this.getRandomInRange(0, fieldHeigth / gridSize) * gridSize;

        return [pointX, pointY];
    };

    private generateRandomPointWithRetiries = (
        occupiedPoints: Point[],
        retriesLeft: number = 3,
    ): Point => {
        if (retriesLeft > 0) {
            const point = this.generateRandomPoint();
            const occupied = this.checkObstacleEncounter(point, occupiedPoints);

            if (occupied) {
                return this.generateRandomPointWithRetiries(
                    occupiedPoints,
                    retriesLeft - 1,
                );
            }

            return point;
        }

        throw new Error("can't generate random point");
    };

    render() {
        return this.props.children(this.state);
    }
}
