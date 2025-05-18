import {EarthImageRes, MarsPhoto, MarWeatherSpec} from '../../utils/DTO';

export interface Title {
  title: string;
}
export type HomeSectionData = MarsPhoto[] | EarthImageRes[] | string[][] | ModifyMarWeatherType | undefined;

export interface ModifyMarWeatherType extends MarWeatherSpec{
  title: string;
}
