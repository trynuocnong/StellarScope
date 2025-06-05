import {KeyValue} from '../../navigation';
import {MissionTrackerRes} from '../../utils/DTO/MissionDTO.ts';

export const SEARCH_TERM: KeyValue[] = [
  {
    label: 'Active',
    value: '10828',
  },
  {
    label: 'Future',
    value: '10873',
  },
  {label: 'Past', value: '10842'},
];

export const mockMission: MissionTrackerRes = {
  posts: [],
  pages: 0,
  page: '',
  results: 0,
};
