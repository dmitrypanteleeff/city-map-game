/**
 * Проверка value на массив по типу
 */
export function isArray(value: any): boolean {
  return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}
