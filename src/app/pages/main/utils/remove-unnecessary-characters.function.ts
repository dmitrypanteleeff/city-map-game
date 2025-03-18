import { ICityDBModel } from '../models';

/**
 * Удаляет символы в скобках
 * @param cities
 */
export function removeUnnecessaryCharacters(
  cities: ICityDBModel[]
): ICityDBModel[] {
  const regExp = new RegExp(/[\s][\(][A-Za-zА-Яа-я\s\-]+[\)]/);

  return cities.map((item) => {
    item.city = item.city?.replace(regExp, '');
    item.name = item.name?.replace(regExp, '');
    return item;
  });
}
