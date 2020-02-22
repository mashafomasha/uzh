import * as React from 'react';
import { Point } from 'types/point';
import './styles.css';

type Props = {
    columns: number;
    rows: number;
    gridSize: number;

    headDeltaX: number;
    headDeltaY: number;

    snake: Point[];
    apple: Point;
};

export class GameCanvas extends React.Component<Props> {
    private canvas: HTMLCanvasElement | null = null;
    private canvasContext: CanvasRenderingContext2D | null = null;
    public canvasRef = React.createRef<HTMLCanvasElement>();

    componentDidMount() {
        if (!this.canvasRef.current) {
            return;
        }
        this.canvas = this.canvasRef.current;
        this.canvasContext = this.canvas.getContext('2d');
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
            apple: [appleX, appleY],
            gridSize,
        } = this.props;

        this.canvasContext!.fillStyle = 'red';

        this.canvasContext!.fillRect(appleX, appleY, gridSize, gridSize);
    };

    private drawSnake = () => {
        const { snake, gridSize } = this.props;

        this.canvasContext!.fillStyle = 'green';

        snake.forEach(([cellX, cellY]) => {
            this.canvasContext!.fillRect(cellX, cellY, gridSize, gridSize);
        });
    };

    render() {
        const { columns, rows, gridSize } = this.props;

        return (
            <canvas
                className="Canvas"
                width={columns * gridSize}
                height={rows * gridSize}
                ref={this.canvasRef}
            >
                У вас старый браузер ¯\_(ツ)_/¯
            </canvas>
        );
    }
}
