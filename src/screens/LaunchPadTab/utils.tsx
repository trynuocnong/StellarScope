import {LaunchResponse} from '../../utils/DTO';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {convertLAUNCHAPI, LAUNCH_API_ENDPOINT} from '../../utils/APIUtils.ts';
import {mockLaunchResponse} from './mock.tsx';
import {THEME_COLORS} from '../../utils/resources/colors.ts';

export const fetchUpcomingLaunches = async (): Promise<LaunchResponse> => {
  const params = {limit: 10};
  try {
    const {data} = await AxiosInstance.get<LaunchResponse>(
      convertLAUNCHAPI(LAUNCH_API_ENDPOINT.LAUNCHES.UPCOMING),
      {
        params: params,
      },
    );
    return data;
  } catch (apiError) {
    console.log(apiError);
    return mockLaunchResponse;
  }
};

// Fetch past launches
export const fetchPastLaunches = async (): Promise<LaunchResponse> => {
  const params = {limit: 10};
  try {
    const {data} = await AxiosInstance.get<LaunchResponse>(
      convertLAUNCHAPI(LAUNCH_API_ENDPOINT.LAUNCHES.PREVIOUS),
      {
        params: params,
      },
    );
    return data;
  } catch (apiError) {
    return mockLaunchResponse;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Success':
    case 'Launch Successful':
      return THEME_COLORS.launchStatus.success;
    case 'Go for Launch':
    case 'Upcoming':
      return THEME_COLORS.launchStatus.upcoming;
    case 'Delay':
    case 'Delayed':
      return THEME_COLORS.launchStatus.delayed;
    case 'Scrubbed':
    case 'Failure':
    case 'Launch Failure':
    case 'Cancel':
      return THEME_COLORS.launchStatus.failed;
    case 'To Be Confirmed':
    case 'To Be Determined':
    default:
      return THEME_COLORS.launchStatus.upcoming;
  }
};
