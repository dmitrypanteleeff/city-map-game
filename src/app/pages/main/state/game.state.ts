import { inject, Injectable, NgModule } from '@angular/core';
import {
  Action,
  NgxsModule,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';

//import { IOptionsModel } from '../types/options.interface';
import { GameAction } from './game.actions';

import { catchError, delay, takeUntil, tap } from 'rxjs';
import { ICityDBModel, ICityModel, IOptionsModel, Step } from '../models';
import { MapGameApiService } from '../services/map-game-api.services';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { DestroyService } from '../../../shared/services/destroy.service';
import { storedCity } from '../main-page.config';
import {
  getCityLastLetter,
  getRandomSymbol,
  removeUnnecessaryCharacters,
} from '../utils';
//import { ICityModel } from '../types/cities.interface';

export interface GameStateModel {
  score: number;
  options: IOptionsModel;
  storedCityList: ICityDBModel[];
  usedCityList: ICityDBModel[];
  city: string;
  step: Step;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    storedCityList: storedCity,
    //storedCityList: [],
    usedCityList: [],
    options: {
      currentLanguage: 'rus',
      languages: ['eng', 'rus'],
    },
    score: 0,
    step: 'user',
    city: '',
  },
})
@Injectable()
export class GameState {
  //constructor(private readonly _api: MapGameApiService) {}
  private readonly _alerts = inject(TuiAlertService);
  private readonly _destroy$ = inject(DestroyService);
  private readonly _api = inject(MapGameApiService);

  @Selector()
  static storedCityList$(state: GameStateModel): ICityDBModel[] {
    return state.storedCityList;
  }

  @Selector()
  static usedCityList$(state: GameStateModel): ICityDBModel[] {
    return state.usedCityList;
  }

  @Selector()
  static options$(state: GameStateModel): IOptionsModel {
    return state.options;
  }

  @Selector()
  static currentLanguage$(state: GameStateModel): string {
    return state.options.currentLanguage;
  }

  @Selector()
  static city$(state: GameStateModel): string {
    return state.city;
  }

  @Selector()
  static score$(state: GameStateModel): number {
    return state.score;
  }

  @Selector()
  static step$(state: GameStateModel): Step {
    return state.step;
  }

  @Action(GameAction.GetCityList)
  GetCityList(
    ctx: StateContext<GameStateModel>,
    { character }: GameAction.GetCityList
  ) {
    const state = ctx.getState();
    const { currentLanguage } = state.options;
    return this._api.getListCityFromLetter(currentLanguage, character).pipe(
      tap((res) => ctx.dispatch(new GameAction.GetCityListSuccess(res.data))),
      /*TODO Добавить логику повторного вызова*/
      catchError((error) => ctx.dispatch(new GameAction.Error(error)))
    );
  }

  @Action(GameAction.GetCityListSuccess)
  GetCityListSuccess(
    ctx: StateContext<GameStateModel>,
    { cities }: GameAction.GetCityListSuccess
  ) {
    let { usedCityList, storedCityList, city } = ctx.getState();

    cities = removeUnnecessaryCharacters(cities);
    console.log(111111, 'city in state', city);

    usedCityList.forEach((usedCity) => {
      cities = cities.filter((city) => city.name !== usedCity.name);
    });

    const index = cities.findIndex(
      (town: ICityDBModel) =>
        town.name[0].toLowerCase() === getCityLastLetter(city)
    );

    // const cityСorresponds = cities.includes(
    //   (town: ICityDBModel) =>
    //     town.name[0].toLowerCase() === getCityLastLetter(city)
    // );
    if (index !== -1) {
      cities = cities.filter(
        (town) => town.name[0].toLowerCase() === getCityLastLetter(city)
      );
      storedCityList = [...storedCityList, ...cities];

      ctx.patchState({ storedCityList });
    }
  }

  @Action(GameAction.DeleteCityFromStoredCityList)
  DeleteCityFromStoredCityList(
    ctx: StateContext<GameStateModel>,
    { name }: GameAction.DeleteCityFromStoredCityList
  ) {
    let { storedCityList } = ctx.getState();
    storedCityList = storedCityList.filter((city) => city.name !== name);
    ctx.patchState({ storedCityList });
  }

  @Action(GameAction.AddCityToUsedCityList)
  AddCityToUsedCityList(
    ctx: StateContext<GameStateModel>,
    { city }: GameAction.AddCityToUsedCityList
  ) {
    let { usedCityList } = ctx.getState();
    usedCityList = [...usedCityList, city];
    ctx.patchState({ usedCityList });
  }

  @Action(GameAction.Error)
  Error(ctx: StateContext<GameStateModel>, { payload }: GameAction.Error) {
    this._alerts
      .open(`<strong>${payload.error.message}</strong>`, {
        label: 'Ошибка!',
        appearance: 'negative',
        autoClose: 3000,
      })
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  @Action(GameAction.ToggleStep)
  ToggleStep(ctx: StateContext<GameStateModel>) {
    let { step } = ctx.getState();
    //debugger;
    step = step === 'user' ? 'opponent' : 'user';

    ctx.patchState({ step });
  }

  @Action(GameAction.SetCityName)
  SetCityName(
    ctx: StateContext<GameStateModel>,
    { city }: GameAction.SetCityName
  ) {
    ctx.patchState({ city });
  }

  @Action(GameAction.AddScore)
  AddScore(ctx: StateContext<GameStateModel>, { score }: GameAction.AddScore) {
    const state = ctx.getState();
    ctx.patchState({ score: state.score + score });
  }

  @Action(GameAction.ResetGame)
  ResetGame(ctx: StateContext<GameStateModel>) {
    const storedCityList: ICityDBModel[] = storedCity;
    const usedCityList: ICityDBModel[] = [];
    const score: number = 0;
    const step: Step = 'user';
    ctx.patchState({ storedCityList, usedCityList, score, step });
  }
}
