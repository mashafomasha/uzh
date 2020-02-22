import React from 'react';
import { Provider } from 'react-redux';
import { Divider } from 'antd';
import { configureStore } from 'store/index';
import { Settings } from 'components/Settings';
import { Game } from 'components/Game';
import { Page } from 'components/Page';

const store = configureStore();

export const App = () => (
    <Provider store={store}>
        <Page>
            <Divider orientation="left">Игра УЖ</Divider>
            <Game />
            <Divider orientation="left">Настройки</Divider>
            <Settings />
        </Page>
    </Provider>
);
