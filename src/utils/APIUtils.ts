import {BASE_URL, URL_VARIANT} from '@env';

export const convertAPI = (path: string) => BASE_URL.concat(`/${path}`);
export const getImage = (date: string, image: string) => {
  const [year, month, day] = date.split(' ')[0].split('-');
  return `${URL_VARIANT}/archive/natural/${year}/${month}/${day}/png/${image}.png`;
};

export const API_ENDPOINT = {
  APOD: 'planetary/apod',
  MSRP: 'mars-photos/api/v1/rovers/curiosity/photos',
  EARTH_IMAGE: 'EPIC/api/natural/images',
  ASTEROIDS_NEOWS: {
    NEO_FEED: 'neo/rest/v1/feed',
    NEO_BROWSE: 'neo/rest/v1/neo/browse/',
    NEO_LOOKUP: 'neo/rest/v1/neo/',
  },
  ASSET: 'asset/',
};
