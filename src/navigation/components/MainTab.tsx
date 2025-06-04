import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {PlatformPressable} from '@react-navigation/elements';
import React from 'react';
import {ROUTES} from '../index.tsx';
import {
  CalendarSVG,
  Planet,
  RocketSVG,
  SearchFillSVG,
  SearchLinearSVG,
  SvgProps2,
} from '../../assets/svg';
import {SvgProps} from 'react-native-svg';
import {COLORS, THEME_COLORS} from '../../utils/resources/colors.ts';

const ICON: Record<
  string,
  {
    active: React.FC<SvgProps | SvgProps2>;
    inactive: React.FC<SvgProps | SvgProps2>;
  }
> = {
  [ROUTES.HOME_TAB]: {
    active: props => <Planet {...props} fill={COLORS.neutral['600']} />,
    inactive: props => <Planet {...props} fill={THEME_COLORS.primary} />,
  },
  [ROUTES.SEARCH_TAB]: {active: SearchFillSVG, inactive: SearchLinearSVG},
  [ROUTES.MISSION_TAB]: {
    active: props => <RocketSVG {...props} fill={COLORS.neutral['600']} />,
    inactive: props => <RocketSVG {...props} fill={THEME_COLORS.primary} />,
  },
  [ROUTES.LAUNCH_PAD_TAB]: {
    active: props => <CalendarSVG {...props} fill={COLORS.neutral['600']} />,
    inactive: props => <CalendarSVG {...props} fill={THEME_COLORS.primary} />,
  },
};

export default ({state, navigation, descriptors}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
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
            <IconTab />
            {isFocused ? (
              <Text style={[styles.tabButtonLabel, styles.tabButtonLabelFocus]}>
                {label}
              </Text>
            ) : (
              <Text style={styles.tabButtonLabel}>{label}</Text>
            )}
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: THEME_COLORS.card,
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLORS.card,
  },
  tabButtonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: THEME_COLORS.primary,
    marginTop: 4,
  },
  tabButtonLabelFocus: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.neutral['600'],
    marginTop: 4,
  },
});
