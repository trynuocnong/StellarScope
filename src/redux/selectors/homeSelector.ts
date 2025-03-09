import {RootReducerState} from '../reducer';

export const selectAPOD = (state: RootReducerState) => state.home.apod;
export const selectMarsRoverPhotos = (state: RootReducerState) =>
  state.home.marsRP;
