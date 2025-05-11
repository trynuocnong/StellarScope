import {KeyValue} from '../../navigation';
import {Dispatch, SetStateAction} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type APODFormParams = {
  count: number;
  startDate: string;
  endDate: string;
};
export type TechFilterRowProps = {
  techFilter: KeyValue;
  setTechFilter: Dispatch<SetStateAction<KeyValue>>;
  style?: StyleProp<ViewStyle>;
};
