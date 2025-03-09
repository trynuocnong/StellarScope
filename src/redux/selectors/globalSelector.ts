import {RootReducerState} from '../reducer';

export const selectName = (state: RootReducerState) => state.global.name;
export const selectConnection = (state: RootReducerState) =>
  state.global.isConnected;
export const selectAvatar = (state: RootReducerState) => state.global.avatar;
