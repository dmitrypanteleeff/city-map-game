import * as geojson from 'geojson';

export namespace GameAction {
  /* Ошибка */
  export class Error {
    static readonly type = '[MAP_GAME page] Error';
    constructor(public readonly payload: Request) {}
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
