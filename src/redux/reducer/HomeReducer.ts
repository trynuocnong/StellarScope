import {APODRes, EarthImageRes, MarsPhoto} from '../../utils/DTO';
import {ActionProps} from './index.ts';
import {SAGA_ACTION} from '../actions';

export type HomeStateProps = {
  apod: APODRes;
  marsRP: MarsPhoto[];
  earthPhotos: EarthImageRes[];
  tech: Array<string[]>;
};

const initialState: HomeStateProps = {
    apod: {
        title: '',
        url: '',
        date: '',
        explanation: '',
        hdurl: '',
        media_type: '',
        service_version: '',
    },
    marsRP: [],
    earthPhotos: [],
    tech: [],
};

const HomeReducer = (state: HomeStateProps = initialState, action: ActionProps) => {
    switch (action.type) {
        case SAGA_ACTION.HOME_ACTION.APOD_UPDATE_DATA: {
            return {...state, apod: action.payload};
        }
        case SAGA_ACTION.HOME_ACTION.UPDATE_MARS_ROVER_PHOTOS: {
            return {...state, marsRP: action.payload};
        }
        case SAGA_ACTION.HOME_ACTION.UPDATE_EARTH_IMAGE: {
            return {...state, earthPhotos: action.payload};
        }
        case SAGA_ACTION.HOME_ACTION.UPDATE_TECHTRANSFER: {
            return {...state, tech: action.payload};
        }
        default:
            return state;
    }
};

export default HomeReducer;
