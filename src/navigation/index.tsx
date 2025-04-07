import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';
import {APODRes} from '../utils/DTO';

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
    DETAIL_APOD_SCREEN: 'DetailedAPODScreen',

    // Stack Native Routes
    NATIVE_STACK: 'NativeStackRoute',
} as const;

export type PARAMS = {
    [ROUTES.HOME_TAB]: undefined,
    [ROUTES.MAIN_BOTTOM_TAB]: undefined,
    [ROUTES.NATIVE_STACK]: undefined,
    [ROUTES.DETAIL_TECH_SCREEN]: { data: string[]},
    [ROUTES.DETAIL_APOD_SCREEN]: { data: APODRes},
};

export const navRef = createRef<NavigationContainerRef<PARAMS>>();

export interface ZustandStore {
    loading: boolean;
    onLoad: (state: boolean) => void;
    globalError: Error | undefined;
    updateError: (state: Error | undefined) => void;
}

export interface ZustandLocalStore {
    useName: string;
    avatar: string;
    firstTime: boolean;
    imagePermission: boolean;
    onUpdatePermission: (state: boolean) => void;
    updateUserName: (name: string) => void;
    updateUserAvatar: (avatar: string) => void;
    updateFirstTime: (state:boolean) => void;
}
