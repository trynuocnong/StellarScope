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
  url: string;
  name: string;
  abbrev: string;
  type: LaunchServiceProviderType;
}

export interface LaunchServiceProviderType {
  id: number;
  name: string;
}

export interface Rocket {
  id: string;
  configuration: RocketConfiguration;
}

export interface LaunchImage {
  id: number;
  name: string;
  image_url: string;
  thumbnail_url: string;
  credit: string;
  license: LaunchImageLicense;
  single_use: boolean;
  variants: any[];
}

export interface LaunchImageLicense {
  id: number;
  name: string;
  priority: number;
  link: string;
}

export interface RocketConfiguration {
  id: number;
  response_mode: string;
  name: string;
  url: string;
  full_name: string;
  variant: string;
  families: ConfigurationFamily[];
}

export interface ConfigurationFamily {
  response_mode: string;
  id: number;
  name: string;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: string;
  image: string | null;
  orbit: MissionOrbit;
  agency: any[];
  info_urls: any[];
  cid_urls: any[];
}

export interface MissionOrbit {
  id: number;
  name: string;
  abbrev: string;
  celestial_body: MissionOrbitCelestialBody
}

export interface MissionOrbitCelestialBody {
  response_mode: string;
  id: number;
  name: string;
}

export interface LaunchStatus {
  id: string;
  name: string;
  abbrev: string;
  description: string;
}

export interface LaunchProgram {
  response_mode: string;
  id: number;
  url: string;
  name: string;
  image: LaunchImage;
  info_url: string;
  wiki_url: string;
  description: string;
  agencies: any[];
  start_date: string;
  end_date: string | null;
  type: LaunchServiceProviderType;
}

export interface LaunchResults
{
  id: string;
  url: string;
  name: string;
  response_mode: string;
  slug: string;
  launch_designator: string | null;
  status: LaunchStatus;
  last_updated: string;
  net: string; // ISO date string for launch time
  window_end: string;
  window_start: string;
  image: LaunchImage;
  infographic: string | null;
  probavility: string | null;
  weather_concerns: string | null;
  failreason: string;
  hashtag: string | null;
  launch_service_provider: LaunchServiceProvider;
  rocket: Rocket;
  mission?: Mission;
  pad: LaunchPad;
  webcast_live: boolean;
  orbital_launch_attempt_count: number;
  location_launch_attempt_count: number;
  pad_launch_attempt_count: number;
  agency_launch_attempt_count: number;
  orbital_launch_attempt_count_year: number;
  location_launch_attempt_count_year: number;
  pad_launch_attempt_count_year: number;
  agency_launch_attempt_count_year: number;
}

export interface LaunchResponse {
  results: LaunchResults[];
  count: number;
  next: string | null;
  previous: string | null;
}
