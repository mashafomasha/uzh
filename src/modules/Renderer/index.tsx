import { Drawable } from 'types/drawable';

type Options = {
    fieldWidth: number;
    fieldHeigth: number;

    renderElements: Drawable[];
    canvasRefObject: React.RefObject<HTMLCanvasElement | null>;
};

// Класс который рисует Drawable на canvas
export class Renderer {
    public fieldWidth: number;
    public fieldHeigth: number;
    public renderElements: Drawable[];
    public canvasRefObject: React.RefObject<HTMLCanvasElement | null>;

    constructor({
        fieldWidth,
        fieldHeigth,
        renderElements,
        canvasRefObject,
    }: Options) {
        this.fieldWidth = fieldWidth;
        this.fieldHeigth = fieldHeigth;
        this.renderElements = renderElements;
        this.canvasRefObject = canvasRefObject;
    }

    public render = () => {
        const context = this.getContext();

        if (context) {
            this.clear(context);
            this.paint(context);
        }
    };

    private clear = (context: CanvasRenderingContext2D) => {
        context.clearRect(0, 0, this.fieldWidth, this.fieldHeigth);
    };

    private paint = (context: CanvasRenderingContext2D) => {
        this.renderElements.forEach((renderElement) =>
            renderElement.draw(context),
        );
    };

    private getContext = () =>
        this.canvasRefObject.current
            ? this.canvasRefObject.current.getContext('2d')
            : null;
}
