import { all } from 'redux-saga/effects';
import {watchHomeSaga} from './homeSaga.ts';

export default function* rootSaga() {
    yield all([
        watchHomeSaga(),
    ]);
}
