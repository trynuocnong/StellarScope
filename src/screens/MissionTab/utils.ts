import {MissionTrackerRes} from '../../utils/DTO/MissionDTO.ts';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {mockMission} from './mock.ts';

export const fetchMission = async (page: number, filter: string): Promise<MissionTrackerRes> => {
  try {
    const {data} = await AxiosInstance.get<MissionTrackerRes>(
      `https://www.nasa.gov/wp-json/nasa-hds/v1/faceted-filter-query?search=&terms%5B%5D=${filter}&taxonomy=mission-terms&post_type=mission&page=${page}`,
    );
    return data;
  } catch (e) {
    return mockMission;
  }
};
