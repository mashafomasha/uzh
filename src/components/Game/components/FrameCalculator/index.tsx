import * as React from 'react';
import { Apple } from 'modules/Apple';
import { Snake } from 'modules/Snake';
import { Renderer } from 'modules/Renderer';

type FrameState = {
    currentFramesCount: number;
};

type FrameProps = {
    active: boolean;
    framesToSkipCount: number;

    speedX: number;
    speedY: number;

    fieldWidth: number;
    fieldHeigth: number;
    gridSize: number;
    canvasRefObject: React.RefObject<HTMLCanvasElement | null>;

    onAppleEncounter: () => void;
    onObstacleEncounter: () => void;
};

export class FrameCalculator extends React.Component<FrameProps, FrameState> {
    private reqAnimationFrameId: number | undefined;
    private apple: Apple;
    private snake: Snake;
    private renderer: Renderer;

    constructor(props: FrameProps) {
        super(props);

        this.apple = new Apple(props);
        this.snake = new Snake(props);
        this.renderer = new Renderer({
            ...props,
            renderElements: [this.apple, this.snake],
        });

        this.state = {
            currentFramesCount: 0,
        };
    }

    componentDidMount() {
        this.renderElementsOnCanvas();
    }

    componentDidUpdate(prevProps: FrameProps) {
        const { active, gridSize, fieldHeigth, fieldWidth } = this.props;

        // запустить игру
        if (!prevProps.active && active) {
            this.reqAnimationFrameId = requestAnimationFrame(
                this.requestAnimationFrame,
            );
        }

        // остановить игру
        if (prevProps.active && !active && this.reqAnimationFrameId) {
            cancelAnimationFrame(this.reqAnimationFrameId);

            // после отмены игры ставим в очередь задачу сброса состояния
            setTimeout(() => {
                this.setState({
                    currentFramesCount: 0,
                });
            }, 0);
        }

        // поменялись настройки
        if (
            prevProps.fieldWidth !== fieldWidth ||
            prevProps.fieldHeigth !== fieldHeigth ||
            prevProps.gridSize !== gridSize
        ) {
            this.apple = new Apple(this.props);
            this.snake = new Snake(this.props);
            this.renderer = new Renderer({
                ...this.props,
                renderElements: [this.apple, this.snake],
            });

            this.renderElementsOnCanvas();

            this.setState({
                currentFramesCount: 0,
            });
        }
    }

    componentWillUnmount() {
        if (this.reqAnimationFrameId) {
            cancelAnimationFrame(this.reqAnimationFrameId);
        }
    }

    private requestAnimationFrame = () => {
        const { currentFramesCount } = this.state;
        const { framesToSkipCount } = this.props;

        this.reqAnimationFrameId = requestAnimationFrame(
            this.requestAnimationFrame,
        );

        // добавляем разреживание кадров в соответствии с заданой скоростью
        if (currentFramesCount < framesToSkipCount) {
            this.setState({ currentFramesCount: currentFramesCount + 1 });
            return;
        }

        this.updatePositions();
        this.renderElementsOnCanvas();
    };

    private updatePositions = () => {
        const {
            onAppleEncounter,
            onObstacleEncounter,
            speedX,
            speedY,
        } = this.props;

        const prevSnakeLength = this.snake.points.length;

        try {
            // если уж врезался сам в себя будет ошибка
            this.snake.update({
                speedX,
                speedY,
                occupiedPoints: this.apple.points.slice(),
            });

            // уж съел яблоко
            if (this.snake.points.length > prevSnakeLength) {
                onAppleEncounter();

                // если уж занимает всё пространство экрана будет ошибка
                this.apple.update({
                    speedX,
                    speedY,
                    occupiedPoints: this.snake.points.slice(),
                });
            }
        } catch {
            // произошло столкновение или некуда добавить яблоко
            onObstacleEncounter();
        } finally {
            this.setState({
                currentFramesCount: 0,
            });
        }
    };

    private renderElementsOnCanvas = () => {
        this.renderer.render();
    };

    render() {
        return this.props.children;
    }
}
