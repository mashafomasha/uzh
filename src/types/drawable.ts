import { Point } from './point';

export type UpdateProps = {
    speedX: number;
    speedY: number;
    occupiedPoints: Point[];
};

export type DrawableOptions = {
    fieldWidth: number;
    fieldHeigth: number;
    gridSize: number;
};

export abstract class Drawable {
    protected gridSize: number;
    protected fieldWidth: number;
    protected fieldHeigth: number;

    constructor({ gridSize, fieldWidth, fieldHeigth }: DrawableOptions) {
        this.gridSize = gridSize;
        this.fieldWidth = fieldWidth;
        this.fieldHeigth = fieldHeigth;
    }

    abstract draw: (context: CanvasRenderingContext2D) => void;
    abstract update: (props: UpdateProps) => void;
}
