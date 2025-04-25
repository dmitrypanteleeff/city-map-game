import { LanguageTypeName } from '../../../shared/models';

/** Интерфейс опций игры */
export interface IOptionsModel {
  currentLanguage: LanguageTypeName;
  languages: string[];
}
