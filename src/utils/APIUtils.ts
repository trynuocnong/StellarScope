import {NASA_URL, NASA_IMAGE_URL, LAUNCH_URL} from '@env';
import AxiosInstance from '../helper/AxiosInstance.ts';
import {MissionTrackerRes} from './DTO/MissionDTO.ts';

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

export const LAUNCH_API_ENDPOINT = {
  LAUNCHES: {
    UPCOMING: 'launches/upcoming',
    PREVIOUS: 'launches/previous',
  },
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

export const NETWORK_STATUS: Record<number, string> = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: `I'm a teapot`, // Easter egg!
  422: 'Unprocessable Entity',
  425: 'Too Early',
  426: 'Upgrade Required',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
};

