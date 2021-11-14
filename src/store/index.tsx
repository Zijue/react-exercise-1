import { applyMiddleware, createStore } from 'redux';
import combinedReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { routerMiddleware } from 'connected-react-router';
import history from '@/history';

let store = applyMiddleware(routerMiddleware(history), thunk, promise, logger)(createStore)(combinedReducer);
export default store;