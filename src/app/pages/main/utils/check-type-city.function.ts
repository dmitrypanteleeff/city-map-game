import { ICityDBModel } from '../models';

/**
 * Функция проверяет тип переменной, соответствует ли он типу ICityDBModel
 * @param city
 * @returns
 */
export function checkTypeCityIsCityDBModel(
  city: ICityDBModel | string | any
): city is ICityDBModel {
  return typeof city !== 'string' && 'city' in city;
}
