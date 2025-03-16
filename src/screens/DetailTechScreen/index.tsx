import React from 'react';
import DetailTechView from './view.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PARAMS} from '../../navigation';

export default function () {
  const {data} = useRoute<RouteProp<PARAMS, 'DetailedTech'>>().params;
  return <DetailTechView data={data} />;
}
