/**
 * Удаляет знаки препинания
 * @param city
 */
export function deleteCharacters(city: string): string {
  const regExp = new RegExp(/[.,!?]/g);
  return city?.replace(regExp, '');
}
