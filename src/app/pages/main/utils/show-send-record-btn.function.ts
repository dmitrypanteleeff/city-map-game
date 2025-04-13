/**
 * Функция отвечает за показ кнопки
 * @param score - Количество очков
 * @param showBtn - Показ кнопки
 * @returns
 */
export function showSendRecordBtn([score, showBtn]: [
  number,
  boolean
]): boolean {
  return score > 0 && showBtn;
}
