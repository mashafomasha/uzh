import { Point } from './point';

export interface Drawable {
    draw: () => void;
    setPosition: (points: Point[]) => void;
}
