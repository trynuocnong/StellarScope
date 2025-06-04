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
    HOME_TAB: 'Home',
    SEARCH_TAB: 'Search',
    MISSION_TAB: 'Mission',
    LAUNCH_PAD_TAB: 'LaunchPad',

    // Stack Routes
    DETAIL_TECH_SCREEN: 'DetailedTech',
    DETAIL_APOD_SCREEN: 'DetailedAPODScreen',
    DETAIL_MAR_WEATHER_SCREEN: 'DetailedMarWeatherScreen',
    WEBVIEW_SCREEN: 'WebviewScreen',
    NATIVE_STACK: 'NativeStackRoute',
    LIST_STACK: {
      LIST_APOD_SCREEN: 'APODListScreen',
    },
} as const;

export type PARAMS = {
    [ROUTES.HOME_TAB]: undefined,
    [ROUTES.MAIN_BOTTOM_TAB]: undefined,
    [ROUTES.NATIVE_STACK]: undefined,
    [ROUTES.DETAIL_TECH_SCREEN]: { data: string[]},
    [ROUTES.DETAIL_APOD_SCREEN]: { data: APODRes},
    [ROUTES.LIST_STACK.LIST_APOD_SCREEN]: undefined,
    [ROUTES.WEBVIEW_SCREEN]: { url: string},
    [ROUTES.DETAIL_MAR_WEATHER_SCREEN]: { sol: string},
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
