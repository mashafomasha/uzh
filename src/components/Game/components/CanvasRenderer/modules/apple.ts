import { Point } from 'types/point';
import { Drawable } from 'types/drawable';

export class Apple implements Drawable {
    private canvasContext: CanvasRenderingContext2D;
    private gridSize: number;
    private applePoints: Point[];

    constructor(
        canvasContext: CanvasRenderingContext2D,
        applePoints: Point[],
        gridSize: number,
    ) {
        this.canvasContext = canvasContext;
        this.gridSize = gridSize;
        this.applePoints = applePoints;
    }

    public draw = () => {
        const { applePoints, gridSize } = this;

        this.canvasContext!.fillStyle = '#f5222d';

        applePoints.forEach(([cellX, cellY]) => {
            this.canvasContext!.fillRect(cellX, cellY, gridSize, gridSize);
        });
    };

    public setPosition = (applePoints: Point[]) => {
        this.applePoints = applePoints;
    };
}
