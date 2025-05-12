import {FeaturesDisplayItemProps} from '../../components/FeatureDisplayItem.tsx';
import {KeyValue, navRef, ROUTES} from '../../navigation';

export const featureList: FeaturesDisplayItemProps[] = [
  {
    name: 'APOD',
    icon: '💫',
    onPress: () => {
      console.log(navRef.current);
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

export const SECTION_HEADER = {
  APOD: 'APOD',
  MARS: 'Mars Rover Photos',
  EARTH: 'Earth Polychromatic Imaging Camera',
  TECH: 'NASA Technology',
};

export const TECHTRANSFER_FILTER: KeyValue[] = [
  {
    label: 'Patents',
    value: 'patents',
  },
  {
    label: 'Software',
    value: 'software',
  },
  {
    label: 'Spinoffs',
    value: 'spinoffs',
  },
]
