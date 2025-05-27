import {EarthImageRes, MarsPhoto, MarWeatherSpec} from '../../utils/DTO';
import {DefaultError, UseQueryResult} from '@tanstack/react-query';
import {StyleProp, ViewStyle} from 'react-native';
import {KeyValue} from '../../navigation';

export interface Title {
  title: string;
}
export type HomeSectionData = MarsPhoto[] | EarthImageRes[] | string[][] | ModifyMarWeatherType | undefined;

export interface ModifyMarWeatherType extends MarWeatherSpec{
  title: string;
}

type BaseItemListProps = {
  refresh?: () => void;
  style?: StyleProp<ViewStyle>;
};

export type EarthCarouselProps = {
  data: UseQueryResult<EarthImageRes[], DefaultError>;
} & BaseItemListProps;

export type MarWeatherProps = {
  data: UseQueryResult<ModifyMarWeatherType, DefaultError>;
} & BaseItemListProps;

export type TechTransferProps = {
  data: UseQueryResult<string[][], DefaultError>;
  options: KeyValue[];
  onSelect?: (key: KeyValue) => void;
} & BaseItemListProps;
