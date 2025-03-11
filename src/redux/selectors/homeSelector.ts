import {RootReducerState} from '../reducer';

export const selectAPOD = (state: RootReducerState) => state.home.apod;
export const selectMarsRoverPhotos = (state: RootReducerState) =>
  state.home.marsRP;
export const selectEarthPhotos = (state: RootReducerState) => state.home.earthPhotos;
export const selectTech = (state: RootReducerState) => state.home.tech;
