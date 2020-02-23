import * as React from 'react';
import { KEY_CODES } from './keycodes';

type HandlerState = {
    deltaX: number;
    deltaY: number;
};

type HandlerProps = {
    active: boolean;
    fieldGridSize: number;
    children: (props: HandlerState) => React.ReactNode;
};

export class KeyboardHandler extends React.Component<
    HandlerProps,
    HandlerState
> {
    constructor(props: HandlerProps) {
        super(props);

        this.state = {
            deltaX: props.fieldGridSize,
            deltaY: 0,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = ({ code }: KeyboardEvent) => {
        const { fieldGridSize: deltaValue } = this.props;
        const { deltaY, deltaX } = this.state;

        switch (true) {
            case code === KEY_CODES.ARROW_DOWN && deltaY === 0:
                return this.setState({
                    deltaX: 0,
                    deltaY: deltaValue,
                });
            case code === KEY_CODES.ARROW_LEFT && deltaX === 0:
                return this.setState({
                    deltaX: -deltaValue,
                    deltaY: 0,
                });
            case code === KEY_CODES.ARROW_RIGHT && deltaX === 0:
                return this.setState({
                    deltaX: deltaValue,
                    deltaY: 0,
                });
            case code === KEY_CODES.ARROW_UP && deltaY === 0:
                return this.setState({
                    deltaX: 0,
                    deltaY: -deltaValue,
                });
        }
    };

    render() {
        return this.props.children(this.state);
    }
}
