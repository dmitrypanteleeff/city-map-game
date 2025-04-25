import { IConfigContent, LanguageTypeName } from '../../../shared/models';

/**
 * Функция возвращает контент в зависимости от текущего языка
 * @param language - Текущий язык
 * @param config - Массив настроек
 * @returns
 */
export function getContentByLanguage([language, config]: [
  LanguageTypeName,
  IConfigContent[]
]): string {
  return config.filter((item) => item.language === language)[0].content;
}
