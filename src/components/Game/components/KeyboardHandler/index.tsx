import * as React from 'react';
import { KEY_CODES } from './keycodes';

type HandlerState = {
    speedX: number;
    speedY: number;
};

type HandlerProps = {
    active: boolean;
    gridSize: number;
    children: (props: HandlerState) => React.ReactNode;
};

export class KeyboardHandler extends React.Component<
    HandlerProps,
    HandlerState
> {
    constructor(props: HandlerProps) {
        super(props);

        this.state = {
            speedX: props.gridSize,
            speedY: 0,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = ({ code }: KeyboardEvent) => {
        const { gridSize } = this.props;
        const { speedY, speedX } = this.state;

        switch (true) {
            case code === KEY_CODES.ARROW_DOWN && speedY === 0:
                return this.setState({
                    speedX: 0,
                    speedY: gridSize,
                });
            case code === KEY_CODES.ARROW_LEFT && speedX === 0:
                return this.setState({
                    speedX: -gridSize,
                    speedY: 0,
                });
            case code === KEY_CODES.ARROW_RIGHT && speedX === 0:
                return this.setState({
                    speedX: gridSize,
                    speedY: 0,
                });
            case code === KEY_CODES.ARROW_UP && speedY === 0:
                return this.setState({
                    speedX: 0,
                    speedY: -gridSize,
                });
        }
    };

    render() {
        return this.props.children(this.state);
    }
}
