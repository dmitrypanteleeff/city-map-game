import { isNullOrEmptyArray } from '.';

/**
 * Проверка value на то, что массив доступен и НЕ пустой
 */
export function isNotNullOrEmptyArray(value: any): boolean {
  return !isNullOrEmptyArray(value);
}
