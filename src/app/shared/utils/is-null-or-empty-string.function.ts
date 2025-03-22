import { isString } from '.';

/**
 * Проверка value на недостуность или пустую строку
 */
export function isNullOrEmptyString(value: any): boolean {
  return !isString(value) || !value.trim();
}
