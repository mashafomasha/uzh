import * as React from 'react';
import { Result, Tabs, Button } from 'antd';
import { Settings } from 'components/Settings';
import { Game } from 'components/Game';
import './styles.css';

type Props = {
    active: boolean;
    onStartGame: () => void;
};

type State = {
    error: boolean;
};

const { TabPane } = Tabs;

export class View extends React.Component<Props, State> {
    constructor(props: Props) {
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
        const { active, onStartGame } = this.props;

        return (
            <main className="Page">
                {error ? (
                    <Result
                        status="error"
                        title="Это ошибка"
                        subTitle="Очень хотелось написать код без багов, но что-то пошло не так ¯\_(ツ)_/¯"
                    />
                ) : (
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Игра" key="1">
                            <Button
                                type="primary"
                                disabled={active}
                                onClick={onStartGame}
                            >
                                Играть
                            </Button>
                            <div className="Game">
                                <Game />
                            </div>
                        </TabPane>
                        <TabPane tab="Настройки" key="2" disabled={active}>
                            <Settings />
                        </TabPane>
                    </Tabs>
                )}
            </main>
        );
    }
}
