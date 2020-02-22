import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'store/index';
import { Settings } from 'components/Settings';
import './styles.css';

const store = configureStore();

export const App = () => (
    <Provider store={store}>
        <div className="Page">
            <Settings />
        </div>
    </Provider>
);
