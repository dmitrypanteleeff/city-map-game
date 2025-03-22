import { isArray } from '.';

/**
 * Проверка value на пустой массив
 */
export function isEmptyArray(value: any): boolean {
  return isArray(value) && value.length === 0;
}
