import * as React from 'react';
import { Point } from 'types/point';

type FrameState = {
    applePoint: Point;
    snakePoints: Point[];

    currentFramesCount: number;
};

type FrameProps = {
    active: boolean;
    framesToSkipCount: number;

    deltaX: number;
    deltaY: number;

    fieldWidth: number;
    fieldHeigth: number;
    fieldGridSize: number;

    onAppleEncounter: () => void;
    onObstacleEncounter: () => void;

    children: (props: FrameState) => React.ReactNode;
};

export class FrameCalculator extends React.Component<FrameProps, FrameState> {
    private reqAnimationFrameId: number | undefined;

    constructor(props: FrameProps) {
        super(props);

        this.state = {
            applePoint: this.generateRandomPoint(),
            snakePoints: [this.generateRandomPoint()],

            currentFramesCount: 0,
        };
    }

    componentDidUpdate(prevProps: FrameProps) {
        const { active, fieldGridSize, fieldHeigth, fieldWidth } = this.props;

        if (!prevProps.active && active) {
            this.reqAnimationFrameId = requestAnimationFrame(
                this.requestAnimationFrame,
            );
        }

        if (prevProps.active && !active && this.reqAnimationFrameId) {
            cancelAnimationFrame(this.reqAnimationFrameId);
        }

        if (
            prevProps.fieldWidth !== fieldWidth ||
            prevProps.fieldHeigth !== fieldHeigth ||
            prevProps.fieldGridSize !== fieldGridSize
        ) {
            this.setState({
                applePoint: this.generateRandomPoint(),
                snakePoints: [this.generateRandomPoint()],
            });
        }
    }

    componentWillUnmount() {
        if (this.reqAnimationFrameId) {
            cancelAnimationFrame(this.reqAnimationFrameId);
        }
    }

    private requestAnimationFrame = () => {
        const { currentFramesCount, snakePoints } = this.state;
        const {
            framesToSkipCount,
            onAppleEncounter,
            onObstacleEncounter,
        } = this.props;

        this.reqAnimationFrameId = requestAnimationFrame(
            this.requestAnimationFrame,
        );

        if (currentFramesCount < framesToSkipCount) {
            this.setState({ currentFramesCount: currentFramesCount + 1 });
            return;
        }

        const position = this.calculatePosition();
        const hasAppleEncounter = this.checkAppleEncounter(position);
        const hasObstacleEncounter = this.checkObstacleEncounter(position);
        const apple = this.generateAppleAtRandomPoint();

        if (hasAppleEncounter) {
            onAppleEncounter();
        }

        if (hasObstacleEncounter || apple === null) {
            onObstacleEncounter();
        }

        this.setState({
            currentFramesCount: 0,
            snakePoints: [
                position,
                ...(hasAppleEncounter ? snakePoints : snakePoints.slice(0, -1)),
            ],
            ...(hasAppleEncounter ? { applePoint: apple! } : null),
        });
    };

    private calculatePosition = (): Point => {
        const {
            deltaX: frameDeltaX,
            deltaY: frameDeltaY,
            fieldGridSize,
            fieldWidth,
            fieldHeigth,
        } = this.props;
        const { snakePoints } = this.state;
        const [prevX, prevY] = snakePoints[0];

        const currentX = this.calculateCoordinateWithWrap(
            prevX + frameDeltaX,
            fieldGridSize,
            fieldWidth,
        );
        const currentY = this.calculateCoordinateWithWrap(
            prevY + frameDeltaY,
            fieldGridSize,
            fieldHeigth,
        );

        return [currentX, currentY];
    };

    private calculateCoordinateWithWrap = (
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

    private checkAppleEncounter = ([headX, headY]: Point) => {
        const [appleX, appleY] = this.state.applePoint;
        return appleX === headX && appleY === headY;
    };

    private checkObstacleEncounter = ([pointX, pointY]: Point) => {
        const { snakePoints } = this.state;
        return Boolean(
            snakePoints.find(
                ([cellX, cellY]) => cellX === pointX && cellY === pointY,
            ),
        );
    };

    private getRandomInRange = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min)) + min;

    private generateRandomPoint = (): Point => {
        const { fieldHeigth, fieldWidth, fieldGridSize } = this.props;

        const pointX =
            this.getRandomInRange(0, fieldWidth / fieldGridSize) *
            fieldGridSize;
        const pointY =
            this.getRandomInRange(0, fieldHeigth / fieldGridSize) *
            fieldGridSize;

        return [pointX, pointY];
    };

    private generateAppleAtRandomPoint = (
        retriesLeft: number = 3,
    ): Point | null => {
        if (retriesLeft > 0) {
            const point = this.generateRandomPoint();
            const occupied = this.checkObstacleEncounter(point);

            if (occupied) {
                return this.generateAppleAtRandomPoint(retriesLeft - 1);
            }

            return point;
        }

        return null;
    };

    render() {
        return this.props.children(this.state);
    }
}
