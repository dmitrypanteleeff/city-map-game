/**
 * Функция возвращает случайное число
 * @param number Число из которого нужно выввести случайное
 * @returns
 */
export function getRandomNumber(number: number): number {
  return Math.floor(Math.random() * number);
}
