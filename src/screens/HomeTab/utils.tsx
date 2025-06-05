import {APODRes, EarthImageRes, MarWeatherReq, MarWeatherRes} from '../../utils/DTO';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {convertNASAAPI, NASA_API_ENDPOINT} from '../../utils/APIUtils.ts';
import {baseAPIParams} from '../../navigation/RootApp.tsx';
import {KeyValue} from '../../navigation';
import {TECH_CONDITION} from './mock.tsx';
import {ModifyMarWeatherType} from './type.ts';
import {NASA_API_KEY} from '@env';

export const fetchAPOD = async (): Promise<APODRes> => {
  const {data} = await AxiosInstance.get(convertNASAAPI(NASA_API_ENDPOINT.APOD), {
    params: baseAPIParams,
  });
  return data;
};

export const fetchTech = async (condition: KeyValue): Promise<string[][]> => {
  let path: string = TECH_CONDITION[condition.value as string];
  const {data} = await AxiosInstance.get(
    convertNASAAPI(path),
    {
      params: {...baseAPIParams, space: ''},
    },
  );
  return data.results.slice(0, 8);
};

export const fetchEarthImage = async (): Promise<EarthImageRes[]> => {
  const {data} = await AxiosInstance.get(convertNASAAPI(NASA_API_ENDPOINT.EARTH_IMAGE), {
    params: baseAPIParams,
  });
  return data;
};

export const fetchMarsWeather = async (): Promise<ModifyMarWeatherType> => {
  const params: MarWeatherReq = {
    api_key: NASA_API_KEY,
    ver: '1.0',
    feedtype: 'json',
  };
  const {data} = await AxiosInstance.get<MarWeatherRes>(
    convertNASAAPI(NASA_API_ENDPOINT.MARS_WEATHER),
    {
      params: params,
    },
  );
  let keyArr = data.sol_keys;
  while (keyArr.length > 0) {
    let len = keyArr.length - 1;
    if (
      data.validity_checks[keyArr[len]].AT.valid &&
      data.validity_checks[keyArr[len]].HWS.valid &&
      data.validity_checks[keyArr[len]].PRE.valid &&
      data.validity_checks[keyArr[len]].WD.valid
    ) {
      return {
        title: keyArr[len],
        ...data[keyArr[len]],
      } as unknown as ModifyMarWeatherType;
    }
    keyArr.pop();
  }
  let len = data.sol_keys.length - 1;

  return {
    title: data.sol_keys[len],
    ...data[data.sol_keys[len]],
  } as unknown as ModifyMarWeatherType;
};
