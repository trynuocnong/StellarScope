export interface LaunchPad {
  id: string;
  name: string;
  location: {
    name: string;
    country: string;
  };
}

export interface LaunchServiceProvider {
  id: string;
  name: string;
  type: string;
}
export interface Rocket {
  id: string;
  name: string;
  configuration: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface LaunchStatus {
  id: string;
  name: any;
  abbrev: string;
  description: string;
}
export interface LaunchResults
{
  id: string;
  name: string;
  status: LaunchStatus;
  net: string; // ISO date string for launch time
  window_start: string;
  window_end: string;
  mission?: Mission;
  rocket: Rocket;
  pad: LaunchPad;
  image: string;
  launch_service_provider: LaunchServiceProvider;
  webcast_live: boolean;
  vidURLs?: string[];
}

export interface LaunchResponse {
  results: LaunchResults[];
  count: number;
  next: string | null;
  previous: string | null;
}
