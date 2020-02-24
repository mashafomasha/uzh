import { Point } from 'types/point';
import { Drawable } from 'types/drawable';

export class Snake implements Drawable {
    private canvasContext: CanvasRenderingContext2D;
    private gridSize: number;
    private snakePoints: Point[];

    constructor(
        canvasContext: CanvasRenderingContext2D,
        snakePoints: Point[],
        gridSize: number,
    ) {
        this.canvasContext = canvasContext;
        this.gridSize = gridSize;
        this.snakePoints = snakePoints;
    }

    public draw = () => {
        const { snakePoints, gridSize } = this;

        this.canvasContext!.fillStyle = '#1890ff';

        snakePoints.forEach(([cellX, cellY]) => {
            this.canvasContext!.fillRect(cellX, cellY, gridSize, gridSize);
        });
    };

    public setPosition = (snakePoints: Point[]) => {
        this.snakePoints = snakePoints;
    };
}
