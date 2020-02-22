import * as React from 'react';
import { Result } from 'antd';
import './styles.css';

type Props = {};

type State = {
    error: boolean;
};

export class Page extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            error: false,
        };
    }

    static getDerivedStateFromError() {
        return { error: true };
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        return (
            <main className="Page">
                {error ? (
                    <Result
                        status="error"
                        title="Это ошибка"
                        subTitle="Очень хотелось написать код без багов, но что-то пошло не так ¯\_(ツ)_/¯"
                    />
                ) : (
                    children
                )}
            </main>
        );
    }
}
