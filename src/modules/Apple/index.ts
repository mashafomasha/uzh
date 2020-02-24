import { Point } from 'types/point';
import { Drawable, UpdateProps, DrawableOptions } from 'types/drawable';
import { checkObstacleEncounter, generateRandomPoint } from 'utils/point';

export class Apple extends Drawable {
    public points: Point[];

    constructor(options: DrawableOptions) {
        super(options);
        const { fieldWidth, fieldHeigth, gridSize } = options;
        this.points = [generateRandomPoint(fieldWidth, fieldHeigth, gridSize)];
    }

    public draw = (context: CanvasRenderingContext2D) => {
        const { points: applePoints, gridSize } = this;

        context.fillStyle = '#f5222d';

        applePoints.forEach(([cellX, cellY]) => {
            context.fillRect(cellX, cellY, gridSize, gridSize);
        });
    };

    public update = ({ occupiedPoints }: UpdateProps) => {
        const point = this.generateRandomPointWithRetiries(occupiedPoints);
        this.points = [point];
    };

    // пытаемся добавить яблоко, проверяем не занята ли клетка
    // если трижды попадаем в занятую клетку, выбрасываем исключение
    private generateRandomPointWithRetiries = (
        occupiedPoints: Point[],
        retriesLeft: number = 3,
    ): Point => {
        if (retriesLeft > 0) {
            const { fieldHeigth, fieldWidth, gridSize } = this;
            const point = generateRandomPoint(
                fieldWidth,
                fieldHeigth,
                gridSize,
            );
            const occupied = checkObstacleEncounter(point, occupiedPoints);

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
}
