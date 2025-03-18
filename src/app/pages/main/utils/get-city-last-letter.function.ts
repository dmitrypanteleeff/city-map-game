/**
 * Получить последнюю букву из названия города
 * @param city
 */
export function getCityLastLetter(city: string): string {
  let lastLetter = city.charAt(city.length - 1);
  for (let i = 1; i < city.length; i++) {
    if (
      lastLetter === 'ь' ||
      lastLetter === 'ъ' ||
      lastLetter === 'ы' ||
      lastLetter === "'" ||
      lastLetter === '`'
    ) {
      lastLetter = city.charAt(city.length - i);
    }
  }
  return lastLetter;
}
