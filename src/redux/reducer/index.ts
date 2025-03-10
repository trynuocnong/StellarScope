import {combineReducers} from 'redux';
import GlobalReducer, {GlobalProps} from './GlobalReducer.ts';
import HomeReducer, {HomeStateProps} from './HomeReducer.ts';

export interface ActionProps<T = any> {
    type: string;
    payload: T;
}

export type RootReducerState = {
    global: GlobalProps,
    home: HomeStateProps,
};

const rootReducer = combineReducers({
    global: GlobalReducer,
    home: HomeReducer,
});

export default rootReducer;

