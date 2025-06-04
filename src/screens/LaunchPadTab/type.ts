import {Dispatch, SetStateAction} from 'react';
import {LaunchResults} from '../../utils/DTO';
import {ListRenderItemInfo} from 'react-native';
import {KeyValue} from '../../navigation';

export type LaunchPadActiveType = 'upcoming' | 'history';

export type FilterItemProps = {
  item: string;
  filterText?: string;
  setFilterText: Dispatch<SetStateAction<string>>;
};

export interface LaunchCountdownProps {
  launch: LaunchResults;
}
export type LaunchItemProps = {
  onPress: (launch: LaunchResults) => void;
} & ListRenderItemInfo<LaunchResults>;

export type LaunchTabHeaderProps = {
  selectLaunch: LaunchResults | undefined;
  onOption: (launch: KeyValue) => void;
  launchResults: LaunchResults[];
  filter: string;
  setFilterText: Dispatch<SetStateAction<string>>;
};
