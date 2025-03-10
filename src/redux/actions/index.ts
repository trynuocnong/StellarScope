export const SAGA_ACTION = {
    GLOBAL_ACTION: {
        NETWORK_CHANGE: 'GLOBAL_ACTION/NETWORK_CHANGE',
        NAME_CHANGE: 'GLOBAL_ACTION/NAME_CHANGE',
        AVATAR_CHANGE: 'GLOBAL_ACTION/AVATAR_CHANGE',
    },
    HOME_ACTION: {
        FETCH_APOD_REQUEST: 'HOME_ACTION/FETCH_APOD_REQUEST',
        APOD_UPDATE_DATA: 'HOME_ACTION/APOD_UPDATE_DATA',
        FETCH_MARS_ROVER_PHOTOS: 'HOME_ACTION/FETCH_MARS_ROVER_PHOTOS',
        UPDATE_MARS_ROVER_PHOTOS: 'HOME_ACTION/UPDATE_MARS_ROVER_PHOTOS',
        FETCH_EARTH_IMAGE: 'HOME_ACTION/FETCH_EARTH_IMAGE',
        UPDATE_EARTH_IMAGE: 'HOME_ACTION/UPDATE_EARTH_IMAGE',
    },
};
