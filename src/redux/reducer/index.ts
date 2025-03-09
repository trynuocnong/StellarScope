import {combineReducers} from 'redux';
import GlobalReducer, {GlobalProps} from './GlobalReducer.ts';

export interface ActionProps<T = any> {
    type: string;
    payload: T;
};

export type RootReducerState = {
    global: GlobalProps,
};

const rootReducer = combineReducers({
    global: GlobalReducer,
});

export default rootReducer;

