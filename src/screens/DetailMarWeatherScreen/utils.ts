import {MarWeatherSpec, WindDirectionSpec} from '../../utils/DTO';

export const normalizeWindData = (data: WindDirectionSpec[]): WindDirectionSpec[] => {
  const maxCt = Math.max(...data.map(d => d.ct));
  return data.map(d => ({
    ...d,
    ct: d.ct / maxCt // normalize to 0–1
  }));
};


export function estimateMarsSunDistance(northernSeason: string): number {
  const parts = northernSeason.toLowerCase().split(' ');
  const season = parts.length > 1 ? parts[1] : parts[0];
  switch (season) {
    case 'spring': return 1.66;
    case 'summer': return 1.52;
    case 'fall': return 1.38; // perihelion
    case 'winter': return 1.52;
    default: return 1.52;
  }
}

export function estimateUVTransmittance(pressurePa: number, windSpeed: number): number {
  // Less pressure = less filtering; more wind = possibly more dust
  let baseTransmittance = 0.95; // max on clear days
  if (pressurePa < 730) {baseTransmittance = 0.97;} // thinner air
  if (pressurePa > 760) {baseTransmittance = 0.90;} // thicker/dustier

  // Adjust for wind (higher wind => possible more dust)
  if (windSpeed > 10) {baseTransmittance -= 0.03;}
  if (windSpeed > 20) {baseTransmittance -= 0.05;}

  return Math.max(0.7, Math.min(1, baseTransmittance)); // Clamp between 0.7 and 1
}

export function calculateMarsUVIndexFromData(solWeather: MarWeatherSpec): number {
  const solarConstantEarth = 1361;
  const uvFraction = 0.07;
  const effectiveFraction = 0.3;
  const uvIndexUnit = 0.025;

  const marsSunDistance = estimateMarsSunDistance(solWeather.Northern_season);
  const solarIrradianceMars = solarConstantEarth / (marsSunDistance ** 2);

  const rawUV = solarIrradianceMars * uvFraction;
  const transmittance = estimateUVTransmittance(solWeather.PRE.av, solWeather.HWS.av);
  const surfaceUV = rawUV * transmittance;
  const effectiveUV = surfaceUV * effectiveFraction;

  const uvIndex = effectiveUV / uvIndexUnit;
  return parseFloat(uvIndex.toFixed(1));
}
