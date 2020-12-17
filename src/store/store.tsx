import React, { FC } from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../reducers';
import { middlewares } from '../middlewares';

const isDev = process.env.NODE_ENV;
const middleware = applyMiddleware(thunk, ...middlewares);
const store: Store = createStore(rootReducer, isDev ? composeWithDevTools(middleware) : middleware);

export const ReduxProvider: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
