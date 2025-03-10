import {APODRes} from '../../utils/DTO';
import {SAGA_ACTION} from './index.ts';
import {MarsRoverPhotoRes} from '../../utils/DTO/marsRoverPhotoDTO.ts';
import {EarthImageRes} from "../../utils/DTO/EarthImageDTO.ts";

export const updateAPODAction = (data: APODRes) =>({
    type: SAGA_ACTION.HOME_ACTION.APOD_UPDATE_DATA,
    payload: data,
});

export const updateMarsRoverPhotosAction = (data: MarsRoverPhotoRes) => ({
    type: SAGA_ACTION.HOME_ACTION.UPDATE_MARS_ROVER_PHOTOS,
    payload: data,
});

export const fetchMarsRoverPhotosAction = (path: string, params?: any) => ({
  type: SAGA_ACTION.HOME_ACTION.FETCH_MARS_ROVER_PHOTOS,
  payload: {path, params},
});

export const fetchAPOD = (path: string, params?: any) => ({
    type: SAGA_ACTION.HOME_ACTION.FETCH_APOD_REQUEST,
    payload: {path, params},
});

export const fetchEarthImagesAction = (path: string, params?: any) => ({
    type: SAGA_ACTION.HOME_ACTION.FETCH_EARTH_IMAGE,
    payload: {path, params},
});

export const updateEarthImagesAction = (data: EarthImageRes) => ({
    type: SAGA_ACTION.HOME_ACTION.UPDATE_EARTH_IMAGE,
    payload: data,
});
