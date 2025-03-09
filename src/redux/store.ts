import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import dataReducer from './reducer';
import {configureStore} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(dataReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchFetchDataSaga); // Run saga

export default store;
