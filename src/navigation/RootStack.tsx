import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navRef, ROUTES } from '.';
import MainTab from './components/MainTab';
import HomeTab from '../screens/HomeTab';
import SearchTab from "../screens/SearchTab";
import MissionTab from '../screens/MissionTab';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const options = {headerShown: false};

const RootBottomTab = () => {
    return (
        <Tab.Navigator tabBar={MainTab} screenOptions={options}>
            <Tab.Screen name={ROUTES.HOME_TAB} component={HomeTab} />
            <Tab.Screen name={ROUTES.SEARCH_TAB} component={SearchTab} />
          <Tab.Screen name={ROUTES.MISSION_TAB} component={MissionTab} />
        </Tab.Navigator>
    );
};


const RootNativeStack = () => {
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name={ROUTES.MAIN_BOTTOM_TAB} component={RootBottomTab}/>
        </Stack.Navigator>
    );
};

export default () => {
    return (
        <NavigationContainer ref={navRef}>
            <RootNativeStack/>
        </NavigationContainer>
    );
};
