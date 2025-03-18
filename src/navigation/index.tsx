import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';

export type KeyValue = {
    label: string;
    value: string | number | boolean;
}

export type KeyName<T> = {
    [key: string]: T;
};

export const ROUTES = {
    // Bottom Tab Routes
    MAIN_BOTTOM_TAB: 'MainBottomTab',
    HOME_TAB: 'HomeTab',
    SEARCH_TAB: 'SearchTab',
    MISSION_TAB: 'MissionTab',

    // Stack Routes
    DETAIL_TECH_SCREEN: 'DetailedTech',

    // Stack Native Routes
    NATIVE_STACK: 'NativeStackRoute',
} as const;

export type PARAMS = {
    [ROUTES.HOME_TAB]: undefined,
    [ROUTES.MAIN_BOTTOM_TAB]: undefined,
    [ROUTES.NATIVE_STACK]: undefined,
    [ROUTES.DETAIL_TECH_SCREEN]: { data: string[]},
};

export const navRef = createRef<NavigationContainerRef<PARAMS>>();
