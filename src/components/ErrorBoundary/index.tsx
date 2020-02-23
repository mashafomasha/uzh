import * as React from 'react';
import { Result } from 'antd';

type State = {
    error: boolean;
};

export class ErrorBoundary<T = {}> extends React.Component<T, State> {
    constructor(props: T) {
        super(props);

        this.state = {
            error: false,
        };
    }

    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {
        const { error } = this.state;

        return error ? (
            <Result
                status="error"
                title="Это ошибка"
                subTitle="Очень хотелось написать код без багов, но что-то пошло не так ¯\_(ツ)_/¯"
            />
        ) : (
            this.props.children
        );
    }
}
