import {CloudSVG, SunnySVG, ThunderStormSVG} from '../../assets/svg';
import React from 'react';

export const conditionConfig = {
  sunny: {
    icon: <SunnySVG width={64} height={64} fill="#FFA500" />,
    description: 'Clear skies',
  },
  dusty: {
    icon: <CloudSVG width={64} height={64} fill="#A0522D" />,
    description: 'Light dust',
  },
  stormy: {
    icon: <ThunderStormSVG width={64} height={64} fill="#800000" />,
    description: 'Severe dust storm',
  },
};

export const baseUV = {
  'spring': 8,
  'summer': 10,  // Highest due to closer orbit to Sun
  'fall': 7,
  'winter': 5,
} as const;
