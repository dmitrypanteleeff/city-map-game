import { ICityModel } from './cities.model';

/* Модель города */
export interface ICityDBModel extends ICityModel {
  /* Город */
  city?: string;

  /* Страна */
  country?: string;

  /* Код страны */
  countryCode?: string;

  /* Уникальный номер */
  id?: number;

  /* Население */
  population?: number;

  /* Регион */
  region?: string;

  /* Код региона */
  regionCode?: string;

  /* id для региона в wikidata */
  regionWdId?: string;

  /* Город */
  type?: string;

  /* id в wikidata Википедии */
  wikiDataId?: string;
}
