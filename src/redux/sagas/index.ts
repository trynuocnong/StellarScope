import { all } from 'redux-saga/effects';
import {watchHomeSaga} from './homeSaga.ts';
import {API_KEY, BASE_URL} from "@env";

export const convertAPI = (path: string) => BASE_URL.concat(`/${path}?api_key=`,API_KEY);

export default function* rootSaga() {
    yield all([
        watchHomeSaga(),
    ]);
}
