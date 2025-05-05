import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navRef, ROUTES} from '.';
import MainTab from './components/MainTab';
import HomeTab from '../screens/HomeTab';
import SearchTab from '../screens/SearchTab';
import MissionTab from '../screens/MissionTab';
import DetailTechScreen from '../screens/DetailTechScreen';
import DetailAPODScreen from '../screens/DetailAPODScreen';
import APODList from '../screens/ListScreens/APODList';
import WebViewScreen from '../screens/WebViewScreen';

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
      <Stack.Screen name={ROUTES.MAIN_BOTTOM_TAB} component={RootBottomTab} />
      <Stack.Screen
        name={ROUTES.DETAIL_TECH_SCREEN}
        component={DetailTechScreen}
      />
      <Stack.Screen
        name={ROUTES.DETAIL_APOD_SCREEN}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
        component={DetailAPODScreen}
      />
      <Stack.Screen
        name={ROUTES.LIST_STACK.LIST_APOD_SCREEN}
        options={{
          presentation: 'modal',
          animation: 'slide_from_right',
        }}
        component={APODList}
      />
      <Stack.Screen
        name={ROUTES.WEBVIEW_SCREEN}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
        component={WebViewScreen}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer ref={navRef}>
      <RootNativeStack />
    </NavigationContainer>
  );
};
