import {call, put, takeLatest} from 'redux-saga/effects';
import {SAGA_ACTION} from '../actions';
import AxiosInstance, {ResponseAPI} from '../../helper/AxiosInstance.ts';
import {APODRes, EarthImageRes, MarsRoverPhotoRes} from '../../utils/DTO';
import {
  updateAPODAction,
  updateEarthImagesAction,
  updateMarsRoverPhotosAction,
  updateTechTransfer,
} from '../actions/HomeAction.ts';
import {convertAPI} from '../../utils/APIUtils.ts';
import {TechTransferRes} from '../../utils/DTO/TechTransferDTO.ts';
import {shuffleArray} from '../../utils/FuncUtils.ts';

function* fetchMarsRoverPhotosSaga(action: any) {
  try {
    const {path, params} = action.payload;
    const response: ResponseAPI<MarsRoverPhotoRes> = yield call(() =>
      AxiosInstance.get(convertAPI(path), {params: params}),
    );
    yield put(updateMarsRoverPhotosAction(response.data.photos));
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

function* fetchEarthImageSaga(action: any) {
  try {
    const {path, params} = action.payload;
    const response: ResponseAPI<EarthImageRes> = yield call(() =>
      AxiosInstance.get(convertAPI(path), {params: params}),
    );
    yield put(updateEarthImagesAction(response.data));
  } catch (error) {
    console.error('Error fetching APOD:', error);
  }
}

function* fetchTechSaga(action: any) {
  try {
    const {path, params} = action.payload;
    const response: ResponseAPI<TechTransferRes> = yield call(() =>
      AxiosInstance.get(convertAPI(path), {params: params}),
    );
    yield put(
      updateTechTransfer(shuffleArray(response.data.results).slice(0, 15)),
    );
  } catch (error) {
    console.error('Error fetching Tech Transfer:', error);
  }
}

export function* watchHomeSaga() {
  yield takeLatest(
    SAGA_ACTION.HOME_ACTION.FETCH_MARS_ROVER_PHOTOS,
    fetchMarsRoverPhotosSaga,
  );
  yield takeLatest(SAGA_ACTION.HOME_ACTION.FETCH_APOD_REQUEST, fetchAPODSaga);
  yield takeLatest(
    SAGA_ACTION.HOME_ACTION.FETCH_EARTH_IMAGE,
    fetchEarthImageSaga,
  );
  yield takeLatest(SAGA_ACTION.HOME_ACTION.FETCH_TECHTRANSFER, fetchTechSaga);
}
