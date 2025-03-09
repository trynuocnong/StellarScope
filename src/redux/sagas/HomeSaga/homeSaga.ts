import { put, takeLatest, call } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import {SAGA_ACTION} from "../../actions";
import {updateMarsRoverPhotos} from "../../actions/HomeAction.ts";

// Fetch Mars Rover Photos
function* fetchMarsRoverPhotosSaga(action: any) {
    try {
        const { path, params } = action.payload;
        const response = yield call(() => axiosInstance.get(path, { params }));
        yield put(updateMarsRoverPhotos(response.data));
    } catch (error) {
        console.error('Error fetching Mars Rover photos:', error);
    }
}

// Fetch Astronomy Picture of the Day (APOD)
function* fetchAPODSaga() {
    try {
        const response = yield call(() => axiosInstance.get('/planetary/apod'));
        yield put(updateAPOD(response.data));
    } catch (error) {
        console.error('Error fetching APOD:', error);
    }
}

export function* watchHomeSaga() {
    yield takeLatest(SAGA_ACTION.HOME_ACTION.FETCH_MARS_ROVER_PHOTOS, fetchMarsRoverPhotosSaga);
    yield takeLatest(SAGA_ACTION.HOME_ACTION.FETCH_APOD_REQUEST, fetchAPODSaga);
}
