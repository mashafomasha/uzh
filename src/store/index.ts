import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { rootReducer } from './reducers';

let store: ReturnType<typeof configureStore> | undefined;

export const getStore = () => store;

export const configureStore = () => {
    const resultStore = createStore(rootReducer, devToolsEnhancer({}));

    store = resultStore;

    return resultStore;
};
