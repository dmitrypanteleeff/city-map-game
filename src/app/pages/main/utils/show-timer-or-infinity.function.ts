import { isNullOrUndefined } from '../../../shared/utils';

/**
 * Отображает бесконечность или значение таймера
 * @param timer Значение таймера
 * @param initialNumber Изначальное значение таймера
 * @returns
 */
export function showTimerOrInfinity([timer, initialNumber]: [number, number]):
  | number
  | string {
  if (isNullOrUndefined(timer)) {
    return initialNumber;
  }
  return timer.toString().length > 5 ? 'ꝏ' : timer;
}
