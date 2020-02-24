import { Point } from 'types/point';
import { Drawable, UpdateProps, DrawableOptions } from 'types/drawable';
import { checkObstacleEncounter, generateRandomPoint } from 'utils/point';

export class Snake extends Drawable {
    public points: Point[];

    constructor(options: DrawableOptions) {
        super(options);
        const { fieldWidth, fieldHeigth, gridSize } = options;
        this.points = [generateRandomPoint(fieldWidth, fieldHeigth, gridSize)];
    }

    public draw = (context: CanvasRenderingContext2D) => {
        const { points, gridSize } = this;

        context.fillStyle = '#1890ff';

        points.forEach(([cellX, cellY]) => {
            context.fillRect(cellX, cellY, gridSize, gridSize);
        });
    };

    public update = ({ occupiedPoints, speedX, speedY }: UpdateProps) => {
        const newSnakeHeadPoint = this.calculateNewSnakeHeadPosition(
            speedX,
            speedY,
        );
        const hasAppleEncounter = checkObstacleEncounter(
            newSnakeHeadPoint,
            occupiedPoints,
        );
        const hasObstacleEncounter = checkObstacleEncounter(
            newSnakeHeadPoint,
            this.points,
        );

        // уж столкнулся сам с собой
        if (hasObstacleEncounter) {
            const { fieldWidth, fieldHeigth, gridSize } = this;
            this.points = [
                generateRandomPoint(fieldWidth, fieldHeigth, gridSize),
            ];
            throw new Error('obstacle encounter');
        }

        this.points = [
            newSnakeHeadPoint,
            // если уж съел яблоко нужно увеличить его длину
            ...(hasAppleEncounter ? this.points : this.points.slice(0, -1)),
        ];
    };

    public calculateNewSnakeHeadPosition = (
        speedX: number,
        speedY: number,
    ): Point => {
        const {
            gridSize,
            fieldWidth,
            fieldHeigth,
            points: [[prevX, prevY]],
        } = this;

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
}
