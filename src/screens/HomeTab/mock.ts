import {FeaturesDisplayItemProps} from '../../components/FeatureDisplayItem.tsx';
import {navRef, ROUTES} from '../../navigation';

export const featureList: FeaturesDisplayItemProps[] = [
  {
    name: 'APOD',
    icon: '💫',
    onPress: () => {
      navRef.current?.navigate(ROUTES.LIST_STACK.LIST_APOD_SCREEN);
    },
  },
  {
    name: 'Mars Rover Photos',
    icon: '🪐',
    onPress: () => {},
  },
  {
    name: 'Earth Imagery',
    icon: '🌍',
    onPress: () => {},
  },
  {
    name: 'Space Mission Tracker',
    icon: '🧑‍🚀',
    onPress: () => {},
  },
  {
    name: 'Exoplanet Explorer',
    icon: '🔭',
    onPress: () => {},
  },
  {
    name: 'Station Tracker',
    icon: '🔭',
    onPress: () => {},
  },
  {
    name: 'Mars Weather',
    icon: '🔭',
    onPress: () => {},
  },
  {
    name: 'Technical Explorer',
    icon: '🔭',
    onPress: () => {},
  },
];
