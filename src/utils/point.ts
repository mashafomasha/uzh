import { Point } from 'types/point';

export const checkObstacleEncounter = (
    [pointX, pointY]: Point,
    pointsToCheck: Point[],
) => {
    return Boolean(
        pointsToCheck.find(
            ([cellX, cellY]) => cellX === pointX && cellY === pointY,
        ),
    );
};

export const getRandomInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;

export const generateRandomPoint = (
    fieldWidth: number,
    fieldHeigth: number,
    gridSize: number,
): Point => {
    const pointX = getRandomInRange(0, fieldWidth / gridSize) * gridSize;
    const pointY = getRandomInRange(0, fieldHeigth / gridSize) * gridSize;

    return [pointX, pointY];
};
