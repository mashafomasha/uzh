import * as React from 'react';
import { Provider } from 'react-redux';
import { Page } from 'components/Page';
import { configureStore } from 'store/index';

const store = configureStore();

export const App = () => (
    <Provider store={store}>
        <Page />
    </Provider>
);
