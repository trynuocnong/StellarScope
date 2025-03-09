import {APODRes} from "../../utils/DTO";
import {MarsRoverPhotoRes} from "../../utils/DTO/marsRoverPhotoDTO.ts";
import {ActionProps} from "./index.ts";
import {SAGA_ACTION} from "../actions";

export type HomeStateProps = {
    apod: APODRes,
    marsRP: MarsRoverPhotoRes,
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
    marsRP: {
        photos: [],
    },
};

const HomeReducer = (state: HomeStateProps = initialState, action: ActionProps) => {
    switch (action.type) {
        case SAGA_ACTION.HOME_ACTION.APOD_UPDATE_DATA: {
            return {...state, apod: action.payload};
        }
        case SAGA_ACTION.HOME_ACTION.UPDATE_MARS_ROVER_PHOTOS: {
            return {...state, marsRP: action.payload};
        }
        default:
            return state;
    }
};

export default HomeReducer;
