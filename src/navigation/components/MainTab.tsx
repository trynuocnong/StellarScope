import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {PlatformPressable} from '@react-navigation/elements';
import React from 'react';
import {ROUTES} from '../index.tsx';
import {
  HomeFillSVG,
  HomeLinearSVG,
  MissionTrackerSVG,
  SearchFillSVG,
  SearchLinearSVG,
  SvgProps2,
} from '../../assets/svg';
import {SvgProps} from 'react-native-svg';

const ICON: Record<
  string,
  { active: React.FC<SvgProps | SvgProps2>; inactive: React.FC<SvgProps | SvgProps2> }
> = {
  [ROUTES.HOME_TAB]: { active: HomeFillSVG, inactive: HomeLinearSVG },
  [ROUTES.SEARCH_TAB]: { active: SearchFillSVG, inactive: SearchLinearSVG },
  [ROUTES.MISSION_TAB]: {
    active: (props) => <MissionTrackerSVG {...props} fill={'#0D2A80'} />,
    inactive: MissionTrackerSVG,
  },
};

export default ({state, navigation, descriptors}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        // const label = route.name;
        const iconSet = ICON[route.name];
        const isFocused = state.index === index;
        const IconTab = isFocused ? iconSet.active : iconSet.inactive;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <PlatformPressable
            key={route.key}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.buttonBar}>
            <IconTab/>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  buttonBar: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
