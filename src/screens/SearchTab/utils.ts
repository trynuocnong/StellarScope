import {KeyName, KeyValue} from '../../navigation';

export const SEARCH_TAG = {
  MEDIA: 'Image and Video',
  TECH: 'Tech & Innovations',
  EXOPLANETS: 'Exoplanets',
  SPACE_MISSION: 'Space Missions',
};

export const dropDownEndPoint: KeyName<KeyValue[]> = {
  [SEARCH_TAG.TECH]: [
    {label: 'Patent', value: 'patent'},
    {label: 'Patent Issue', value: 'patent_issued'},
    {label: 'Software', value: 'software'},
    {label: 'Spinoff', value: 'Spinoff'},
  ],
  [SEARCH_TAG.MEDIA]: [
    {label: 'Image', value: 'image'},
    {label: 'Video', value: 'video'},
    {label: 'Image & Video', value: 'both'},
  ],
  [SEARCH_TAG.EXOPLANETS]: [
    {label: 'Planet Name', value: 'pl_name'},
    {label: 'Orbit Planet', value: 'hostname'},
  ],
  [SEARCH_TAG.SPACE_MISSION]: [
    {label: 'Mission Name', value: 'mission_name'},
    {label: 'Media', value: 'media'},
    {label: 'People', value: 'people'},
  ],
};

export const options: KeyValue[] = [
  {label: SEARCH_TAG.TECH, value: 0},
  {label: SEARCH_TAG.MEDIA, value: 1},
  {label: SEARCH_TAG.EXOPLANETS, value: 2},
  {label: SEARCH_TAG.SPACE_MISSION, value: 3},
];
