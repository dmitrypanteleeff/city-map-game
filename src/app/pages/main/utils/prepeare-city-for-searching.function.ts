import { CityModel } from '../models';

/**
 * Функция мапит объект с городом
 * @param city
 * @returns
 */
export function prepeareCityForSearching(city: any): CityModel | undefined {
  if (city == null) {
    return;
  }

  const { x, y, raw } = city;

  return {
    x,
    y,
    name: raw.name,
  };
}
