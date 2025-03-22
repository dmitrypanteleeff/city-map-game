import { isArray, isEmptyArray, isNullOrUndefined } from '.';

/**
 * Проверка value на недоступный или пустой массив
 */
export function isNullOrEmptyArray(value: any): boolean {
  return isNullOrUndefined(value) || !isArray(value) || isEmptyArray(value);
}
