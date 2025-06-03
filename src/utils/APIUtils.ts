import {NASA_URL, NASA_IMAGE_URL, LAUNCH_URL} from '@env';
import AxiosInstance from '../helper/AxiosInstance.ts';

export const convertNASAAPI = (path: string) => {
  return new URL(path, NASA_URL).toString();
};
export const convertLAUNCHAPI = (path: string) => {
  return new URL(path, LAUNCH_URL).toString();
};

export const getImage = (date: string, image: string) => {
  const [year, month, day] = date.split(' ')[0].split('-');
  return `${NASA_IMAGE_URL}/archive/natural/${year}/${month}/${day}/png/${image}.png`;
};

export const NASA_API_ENDPOINT = {
  APOD: 'planetary/apod',
  MSRP: 'mars-photos/api/v1/rovers/curiosity/photos',
  EARTH_IMAGE: 'EPIC/api/natural/images',
  MARS_WEATHER: 'insight_weather/',
  ASTEROIDS_NEOWS: {
    NEO_FEED: 'neo/rest/v1/feed',
    NEO_BROWSE: 'neo/rest/v1/neo/browse/',
    NEO_LOOKUP: 'neo/rest/v1/neo/',
  },
  TECH_TRANSFER: {
    PATENT: 'techtransfer/patent/',
    PATENT_ISSUE: 'techtransfer/patent_issued/',
    SOFTWARE: 'techtransfer/software/',
    SPIN_OFF: 'techtransfer/spinoff/',
  },
  SEARCH: {
    DEFAULT: 'default',
  },
  ASSET: 'asset/',
};

export const fetchMission = async (page: number, filter: string) => {
  try {
    return await AxiosInstance.get(
      `https://www.nasa.gov/wp-json/nasa-hds/v1/faceted-filter-query?search=&terms%5B%5D=${filter}&taxonomy=mission-terms&post_type=mission&page=${page}`,
    );
  } catch (e) {
    return undefined;
  }
};
