export interface MarsRoverPhotoRes {
  photos: MarsPhoto[];
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: MarsCamera;
  img_src: string;
  earth_date: string;
  rover: MarsRover;
}

export interface MarsCamera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface MarsRover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface MarsRP_Sol_Params {
  sol: number;
  camera: string;
  page: number;
  api_key: string;
}

export interface MarsRP_EARTH_DATE_Params {
  earth_date: string;
  camera: string;
  page: number;
  api_key: string;
}
