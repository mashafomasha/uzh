import * as React from 'react';
import { Point } from 'types/point';
import './styles.css';

type Props = {
    fieldWidth: number;
    fieldHeigth: number;
    fieldGridSize: number;

    applePoint: Point;
    snakePoints: Point[];
};

export class CanvasRenderer extends React.Component<Props> {
    private canvas: HTMLCanvasElement | null = null;
    private canvasContext: CanvasRenderingContext2D | null = null;
    public canvasRef = React.createRef<HTMLCanvasElement>();

    componentDidMount() {
        if (!this.canvasRef.current) {
            return;
        }
        this.canvas = this.canvasRef.current;
        this.canvasContext = this.canvas.getContext('2d');
        this.paint();
    }

    componentDidUpdate() {
        this.paint();
    }

    private paint = () => {
        if (!this.canvas || !this.canvasContext) {
            return;
        }

        this.canvasContext.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );

        this.drawApple();
        this.drawSnake();
    };

    private drawApple = () => {
        const {
            applePoint: [appleX, appleY],
            fieldGridSize,
        } = this.props;

        this.canvasContext!.fillStyle = '#f5222d';

        this.canvasContext!.fillRect(
            appleX,
            appleY,
            fieldGridSize,
            fieldGridSize,
        );
    };

    private drawSnake = () => {
        const { snakePoints, fieldGridSize } = this.props;

        this.canvasContext!.fillStyle = '#1890ff';

        snakePoints.forEach(([cellX, cellY]) => {
            this.canvasContext!.fillRect(
                cellX,
                cellY,
                fieldGridSize,
                fieldGridSize,
            );
        });
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
