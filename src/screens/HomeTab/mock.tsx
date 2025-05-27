import {FeaturesDisplayItemProps} from '../../components/FeatureDisplayItem.tsx';
import {KeyValue, navRef, ROUTES} from '../../navigation';
import {CloudSVG, SunnySVG, ThunderStormSVG} from '../../assets/svg';
import * as React from 'react';
import {API_ENDPOINT} from '../../utils/APIUtils.ts';

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
  // {
  //   name: 'Exoplanet Explorer',
  //   icon: '🔭',
  //   onPress: () => {},
  // },
  {
    name: 'Station Tracker',
    icon: '🔭',
    onPress: () => {},
  },
  // {
  //   name: 'Mars Weather',
  //   icon: '🔭',
  //   onPress: () => {},
  // },
  // {
  //   name: 'Technical Explorer',
  //   icon: '🔭',
  //   onPress: () => {},
  // },
];

export const SECTION_HEADER = {
  APOD: 'APOD',
  MARS: 'Mars Rover Photos',
  EARTH: 'Earth Polychromatic Imaging Camera',
  MAR_WEATHER: 'Mars\'s Weather',
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

export const conditionConfig = {
  sunny: {
    icon: <SunnySVG width={64} height={64} fill="#FFA500" />,
    label: 'Sunny',
    color: '#FFD700',
    description: 'Clear skies',
  },
  dusty: {
    icon: <CloudSVG width={64} height={64} fill="#A0522D" />,
    label: 'Dusty',
    color: '#D2B48C',
    description: 'Light dust',
  },
  stormy: {
    icon: <ThunderStormSVG width={64} height={64} fill="#800000" />,
    label: 'Dust Storm',
    color: '#8B0000',
    description: 'Severe dust storm',
  },
};

export const TECH_CONDITION = {
  [TECHTRANSFER_FILTER[0].value as string]: API_ENDPOINT.TECH_TRANSFER.PATENT,
  [TECHTRANSFER_FILTER[1].value as string]: API_ENDPOINT.TECH_TRANSFER.SOFTWARE,
  [TECHTRANSFER_FILTER[2].value as string]: API_ENDPOINT.TECH_TRANSFER.SPIN_OFF,
};
