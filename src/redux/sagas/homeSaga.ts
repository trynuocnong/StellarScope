import {call, put, takeLatest} from 'redux-saga/effects';
import {SAGA_ACTION} from '../actions';
import AxiosInstance, {ResponseAPI} from '../../helper/AxiosInstance.ts';
import {MarsRoverPhotoRes} from '../../utils/DTO/marsRoverPhotoDTO.ts';
import {
  updateAPODAction,
  updateMarsRoverPhotosAction,
} from '../actions/HomeAction.ts';
import {APODRes} from '../../utils/DTO';
import {convertAPI} from './index.ts';

function* fetchMarsRoverPhotosSaga(action: any) {
  try {
    const {path, params} = action.payload;
    const response: ResponseAPI<MarsRoverPhotoRes> = yield call(() =>
      AxiosInstance.get(convertAPI(path), {params: params}),
    );
    yield put(updateMarsRoverPhotosAction(response.data));
  } catch (error) {
    console.error('Error fetching Mars Rover photos:', error);
  }
}

function* fetchAPODSaga(action: any) {
  try {
    const {path, params} = action.payload;
    const response: ResponseAPI<APODRes> = yield call(() =>
      AxiosInstance.get(convertAPI(path), {params: params}),
    );
    yield put(updateAPODAction(response.data));
  } catch (error) {
    console.error('Error fetching APOD:', error);
  }
}

export function* watchHomeSaga() {
  yield takeLatest(
    SAGA_ACTION.HOME_ACTION.FETCH_MARS_ROVER_PHOTOS,
    fetchMarsRoverPhotosSaga,
  );
  yield takeLatest(SAGA_ACTION.HOME_ACTION.FETCH_APOD_REQUEST, fetchAPODSaga);
}
