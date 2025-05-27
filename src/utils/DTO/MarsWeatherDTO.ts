import {BASE_PARAMS} from './index.ts';

export interface WindDirectionSpec {
  compass_degrees: number;
  compass_point: string;
  compass_right: number;
  compass_up: number;
  ct: number;
}

export interface MarWeatherSpec {
  AT: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  First_UTC: string;
  HWS: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  Last_UTC: string;
  Month_ordinal: number;
  Northern_season: string;
  PRE: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  Season: string;
  Southern_season: string;
  WD: {
    [direction: string]: WindDirectionSpec;
    most_common: WindDirectionSpec;
  };
}

export interface WeatherData {
  [solKey: string]: MarWeatherSpec;
}

interface ValidityCheck {
  sol_hours_with_data: number[];
  valid: boolean;
}

interface KeyValidityChecked {
  [solKey: string]: {
    AT: ValidityCheck;
    HWS: ValidityCheck;
    PRE: ValidityCheck;
    WD: ValidityCheck;
  };
}

interface KeyWeatherData {
  [solKey: string]: WeatherData;
}

type ValidityChecks = KeyValidityChecked & {
  sol_hours_required: number;
  sols_checked: string[];
};

export type MarWeatherReq = {
  ver: string;
  feedtype: string;
} & BASE_PARAMS;

export type MarWeatherRes = KeyWeatherData & {
  sol_keys: string[];
  validity_checks: ValidityChecks;
}
