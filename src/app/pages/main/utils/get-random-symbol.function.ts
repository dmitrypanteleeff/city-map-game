import { getRandomNumber } from '.';
import { LanguageTypeName } from '../../../shared/models';
import {
  engAlphabet,
  ruAlphabet,
} from '../containers/map-game/map-game.config';

/**
 * Функция получает случайную букву из алфавита в зависимости от текущего языка
 * @param alphabet - Алфавит
 * @returns
 */
export function getRandomSymbol(alphabet: LanguageTypeName) {
  switch (alphabet) {
    case 'eng':
      return engAlphabet[getRandomNumber(engAlphabet.length)];
    default:
      return ruAlphabet[getRandomNumber(ruAlphabet.length)];
  }
}
