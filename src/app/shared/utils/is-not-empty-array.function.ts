import { isEmptyArray } from '.';

/**
 * Проверка value на то, что массив НЕ пустой
 */
export function isNotEmptyArray(value: any): boolean {
  return !isEmptyArray(value);
}
