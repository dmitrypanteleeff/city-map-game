import { checkTypeCityIsCityDBModel } from '.';
import { ICityModel } from '../models';

/**
 * Функция мапит объект с городом
 * @param city
 * @returns
 */
export function prepeareCityForSearching(city: any): ICityModel | undefined {
  if (city === null) {
    return;
  }

  if (checkTypeCityIsCityDBModel(city)) {
    const { latitude, longitude, name } = city;

    return {
      longitude,
      latitude,
      name,
    };
  }

  const { x, y, raw } = city;

  return {
    longitude: x,
    latitude: y,
    name: raw.name,
  };
}
