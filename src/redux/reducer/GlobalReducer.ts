import {ActionProps} from './index.ts';
import {SAGA_ACTION} from '../actions';

export type GlobalProps = {
  name: string;
  isConnected: boolean;
  avatar: string;
};

const initialState: GlobalProps = {
  name: '',
  avatar: '',
  isConnected: true,
};

const GlobalReducer = (
    state: GlobalProps = initialState,
    action: ActionProps
): GlobalProps => {
  switch (action.type) {
    case SAGA_ACTION.GLOBAL_ACTION.NAME_CHANGE:
      return { ...state, name: action.payload as string };
    case SAGA_ACTION.GLOBAL_ACTION.NETWORK_CHANGE:
      return { ...state, isConnected: action.payload as boolean };
    case SAGA_ACTION.GLOBAL_ACTION.AVATAR_CHANGE:
      return { ...state, avatar: action.payload as string };
    default:
      return state;
  }
};

export default GlobalReducer;

