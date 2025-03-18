import * as geojson from 'geojson';
import { ICityDBModel } from '../models';

export namespace GameAction {
  /* Ошибка */
  export class Error {
    static readonly type = '[MAP_GAME page] Error';
    constructor(public readonly payload: Request) {}
  }

  /* Получить список городов по букве */
  export class GetCityList {
    static readonly type = '[MAP_GAME page] Get City List';
    constructor(public readonly character: string) {}
  }

  /* Успешное получение списка городов по букве */
  export class GetCityListSuccess {
    static readonly type = '[MAP_GAME page] Get City List Success';
    constructor(public readonly cities: ICityDBModel[]) {}
  }

  /* Поменять шаг */
  export class ToggleStep {
    static readonly type = '[MAP_GAME page] Toggle Step';
    constructor() {}
  }

  /* Установить название города */
  export class SetCityName {
    static readonly type = '[MAP_GAME page] Set City Name';
    constructor(public readonly city: string) {}
  }

  /* Сброс хранилища */
  export class Reset {
    static readonly type = '[MAP_GAME page] Reset';
    constructor() {}
  }

  /* Сброс слоя с картой */
  export class ResetFeatureCollection {
    static readonly type = '[MAP_GAME page] Reset Feature Collection';
    constructor() {}
  }

  /* Загрузка слоя с картой */
  export class LoadFeatureCollection {
    static readonly type = '[MAP_GAME page] Load Feature Collection';
    constructor() {}
  }

  /* Успешная загрузка слоя с картой */
  export class LoadFeatureCollectionSuccess {
    static readonly type = '[MAP_GAME page] Load Feature Collection Success';
    constructor(
      public readonly payload:
        | geojson.GeoJsonObject
        | geojson.GeoJsonObject[]
        | undefined
    ) {}
  }

  /* Ошибка загрузки слоя с картой */
  export class LoadFeatureCollectionError {
    static readonly type = '[MAP_GAME page] Load Feature Collection Error';
    constructor(public readonly payload: Request) {}
  }

  /* Загрузка слоя списка услуг */
  export class LoadOffersList {
    static readonly type = '[MAP_GAME page] Load Offers List';
    constructor() {}
  }

  /* Успешная загрузка слоя списка услуг */
  export class LoadOffersListSuccess {
    static readonly type = '[MAP_GAME page] Load Offers List Success';
    constructor(public readonly payload: unknown) {}
  }

  /* Успешная загрузка слоя списка услуг */
  export class LoadOffersListError {
    static readonly type = '[MAP_GAME page] Load Offers List Error';
    constructor(public readonly payload: Request) {}
  }
}
