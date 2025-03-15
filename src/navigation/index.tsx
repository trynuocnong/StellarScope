import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import {HomeStateProps} from '../redux/reducer/HomeReducer.ts';


export const ROUTES = {
    // Bottom Tab Routes
    MAIN_BOTTOM_TAB: 'MainBottomTab',
    HOME_TAB: 'HomeTab',
    SEARCH_TAB: 'SearchTab',
    MISSION_TAB: 'MissionTab',

    // Stack Native Routes
    NATIVE_STACK: 'NativeStackRoute',
    TEST: 'Tester',
} as const;

export type PARAMS = {
    [ROUTES.HOME_TAB]: undefined,
    [ROUTES.MAIN_BOTTOM_TAB]: undefined,
    [ROUTES.NATIVE_STACK]: undefined,
    [ROUTES.TEST]: { data: Partial<HomeStateProps>, position: number}
};

export const navRef = createRef<NavigationContainerRef<PARAMS>>();
