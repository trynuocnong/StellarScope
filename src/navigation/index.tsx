import { NavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";


export const ROUTES = {
    // Bottom Tab Routes
    MAIN_BOTTOM_TAB: 'MainBottomTab',
    HOME_TAB: 'HomeTab',

    // Stack Native Routes
    NATIVE_STACK: 'NativeStackRoute',
};

export type PARAMS = {
    [ROUTES.HOME_TAB]: undefined,
    [ROUTES.MAIN_BOTTOM_TAB]: undefined,
    [ROUTES.NATIVE_STACK]: undefined,
};

export const navRef = createRef<NavigationContainerRef<PARAMS>>();
