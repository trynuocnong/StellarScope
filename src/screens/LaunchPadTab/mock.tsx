import {LaunchResponse} from '../../utils/DTO';
import {KeyValue} from '../../navigation';

export const mockLaunchResponse: LaunchResponse = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};

export const KEY_QUERIES = {
  PAST: 'PAST',
  UPCOMING: 'UPCOMING',
};

export const LAUNCHPAD_OPTIONS: KeyValue[] = [
  {label: 'Upcoming Launch', value: 'upcoming'},
  {label: 'Past Launch', value: 'history'},
];
