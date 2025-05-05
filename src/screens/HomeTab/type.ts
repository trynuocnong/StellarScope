import {EarthImageRes, MarsPhoto} from '../../utils/DTO';
export interface Title { title: string }
export type HomeSectionData = MarsPhoto[] | EarthImageRes[] | string[][] | undefined
