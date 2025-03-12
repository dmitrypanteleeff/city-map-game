import { inject, Injectable, NgModule } from '@angular/core';
import {
  Action,
  NgxsModule,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';

//import { OptionsModel } from '../types/options.interface';
import { GameAction } from './game.actions';

import { catchError, delay, takeUntil, tap } from 'rxjs';
import { CityModel, OptionsModel } from '../models';
import { MapGameApiService } from '../services/map-game-api.services';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { DestroyService } from '../../../shared/services/destroy.service';
//import { CityModel } from '../types/cities.interface';

export interface GameStateModel {
  score: number;
  options: OptionsModel;
  cityList: CityModel[];
  city?: CityModel;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    cityList: [],
    options: {
      currentLanguage: 'rus',
      languages: ['eng', 'rus'],
    },
    score: 0,
  },
})
@Injectable()
export class GameState {
  //constructor(private readonly _api: MapGameApiService) {}
  private readonly _alerts = inject(TuiAlertService);
  private readonly _destroy$ = inject(DestroyService);

  @Selector()
  static cityList$(state: GameStateModel): CityModel[] {
    return state.cityList;
  }

  @Selector()
  static options$(state: GameStateModel): OptionsModel {
    return state.options;
  }

  @Selector()
  static city$(state: GameStateModel): CityModel | undefined {
    return state.city;
  }

  @Selector()
  static score$(state: GameStateModel): number {
    return state.score;
  }

  //   @Action(OffersAction.LoadFeatureCollection)
  //   LoadFeatureCollection(ctx: StateContext<GameStateModel>) {
  //     return this._api.LoadFeatureCollection().pipe(
  //       tap((res) =>
  //         ctx.dispatch(new OffersAction.LoadFeatureCollectionSuccess(res))
  //       ),
  //       catchError((error) =>
  //         ctx.dispatch(new OffersAction.LoadFeatureCollectionError(error))
  //       )
  //     );
  //   }

  //   @Action(OffersAction.LoadFeatureCollectionSuccess)
  //   LoadFeatureCollectionSuccess(
  //     ctx: StateContext<GameStateModel>,
  //     { payload }: OffersAction.LoadFeatureCollectionSuccess
  //   ) {
  //     ctx.patchState({
  //       loadFeatureCollection: true,
  //     });
  //   }

  //   @Action(OffersAction.LoadFeatureCollectionError)
  //   LoadFeatureCollectionError(
  //     ctx: StateContext<GameStateModel>,
  //     { payload }: OffersAction.LoadFeatureCollectionError
  //   ) {
  //     ctx.patchState({
  //       loadFeatureCollection: false,
  //     });
  //     ctx.dispatch(new OffersAction.Error(payload));
  //   }

  //   @Action(OffersAction.LoadOffersList)
  //   LoadOffersList(ctx: StateContext<GameStateModel>) {
  //     return this._api.LoadOffersList().pipe(
  //       delay(2000),
  //       tap((res) => ctx.dispatch(new OffersAction.LoadOffersListSuccess(res))),
  //       catchError((error) =>
  //         ctx.dispatch(new OffersAction.LoadFeatureCollectionError(error))
  //       )
  //     );
  //   }

  //   @Action(OffersAction.LoadOffersListSuccess)
  //   LoadOffersListSuccess(
  //     ctx: StateContext<GameStateModel>,
  //     { payload }: OffersAction.LoadOffersListSuccess
  //   ) {
  //     let data = payload as any;
  //     console.log(11111, data.data);
  //     ctx.patchState({
  //       orderList: data.data,
  //     });
  //   }

  //   @Action(OffersAction.LoadOffersListError)
  //   LoadOffersListError(
  //     ctx: StateContext<GameStateModel>,
  //     { payload }: OffersAction.LoadOffersListError
  //   ) {
  //     ctx.patchState({
  //       orderList: [],
  //     });
  //     ctx.dispatch(new OffersAction.Error(payload));
  //   }

  @Action(GameAction.Error)
  Error(ctx: StateContext<GameStateModel>, { payload }: GameAction.Error) {
    console.log('Error');
    this._alerts
      .open('Basic <strong>HTML</strong>', {
        label: 'Ошибка!',
        appearance: 'negative',
        autoClose: 3000,
      })
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }
}
