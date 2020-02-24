import * as React from 'react';
import { Point } from 'types/point';
import { Snake } from './modules/snake';
import { Apple } from './modules/apple';
import './styles.css';

type Props = {
    gridSize: number;
    fieldWidth: number;
    fieldHeigth: number;

    applePoints: Point[];
    snakePoints: Point[];
};

export class CanvasRenderer extends React.Component<Props> {
    private canvasContext: CanvasRenderingContext2D | null = null;
    private canvasRef = React.createRef<HTMLCanvasElement>();

    private snake: Snake | null = null;
    private apple: Apple | null = null;

    componentDidMount() {
        if (!this.canvasRef.current) {
            return;
        }
        this.canvasContext = this.canvasRef.current.getContext('2d');

        if (!this.canvasContext) {
            return;
        }
        const { gridSize, snakePoints, applePoints } = this.props;

        this.snake = new Snake(this.canvasContext, snakePoints, gridSize);
        this.apple = new Apple(this.canvasContext, applePoints, gridSize);

        this.paint();
    }

    componentDidUpdate() {
        this.clear();
        this.update();
        this.paint();
    }

    private clear = () => {
        if (!this.canvasContext) {
            return;
        }

        this.canvasContext.clearRect(
            0,
            0,
            this.props.fieldWidth,
            this.props.fieldHeigth,
        );
    };

    private update = () => {
        const { snakePoints, applePoints } = this.props;

        this.apple?.setPosition(applePoints);
        this.snake?.setPosition(snakePoints);
    };

    private paint = () => {
        this.apple?.draw();
        this.snake?.draw();
    };

    render() {
        const { fieldWidth, fieldHeigth } = this.props;

        return (
            <canvas
                className="Canvas"
                width={fieldWidth}
                height={fieldHeigth}
                ref={this.canvasRef}
            ></canvas>
        );
    }
}
