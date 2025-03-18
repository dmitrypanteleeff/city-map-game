import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import * as MapConfig from './map-game.config';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { TuiLet } from '@taiga-ui/cdk';
import {
  Map,
  Polygon,
  Circle,
  Marker,
  control,
  tileLayer,
  MapOptions,
} from 'leaflet';
import { MapGameFormsService } from '../../services/map-game-form.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTooltip } from '@taiga-ui/kit';
import { TuiIcon, TuiLoader, TuiTextfield } from '@taiga-ui/core';

import { DestroyService } from '../../../../shared/services/destroy.service';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  from,
  iif,
  interval,
  map,
  Observable,
  of,
  reduce,
  scan,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { TuiBreakpointService } from '@taiga-ui/core';
import {
  addMarker,
  checkTypeCityIsCityDBModel,
  getCityLastLetter,
  prepeareCityForSearching,
  removeUnnecessaryCharacters,
  resizeElements,
} from '../../utils';
import { ICityDBModel, ICityModel, Step } from '../../models';
import { AsyncPipe } from '@angular/common';
import { FunctionPipe } from '../../../../shared/pipes';
import {
  Actions,
  ofActionCompleted,
  ofActionSuccessful,
  Select,
  Store,
} from '@ngxs/store';
import { GameAction } from '../../state/game.actions';
import { GameState } from '../../state/game.state';
import { storedCity } from '../../main-page.config';

@Component({
  selector: 'app-map-game',
  imports: [
    LeafletModule,
    ReactiveFormsModule,
    TuiIcon,
    TuiLoader,
    TuiTextfield,
    TuiTooltip,
    FormsModule,
    TuiLet,
    AsyncPipe,
    FunctionPipe,
  ],
  templateUrl: './map-game.component.html',
  styleUrl: './map-game.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapGameComponent implements OnInit, AfterViewInit {
  private readonly _destroy$ = inject(DestroyService);
  private readonly _form = inject(MapGameFormsService);
  private readonly _store = inject(Store);
  private readonly _actions = inject(Actions);

  readonly _breakpoint$ = inject(TuiBreakpointService);

  readonly city$$ = new Subject<ICityDBModel | string>();
  readonly flyToCity$$ = new Subject<ICityModel>();
  readonly lastCityLetter$$ = new Subject<string>();
  readonly setCityName$$ = new Subject<string>();
  readonly changeMove$$ = new Subject<boolean>();
  readonly repeatSearchCity$$ = new Subject<string>();

  readonly usedCityList$: Observable<ICityDBModel[]> = this._store.select(
    GameState.usedCityList$
  );
  readonly storedCityList$: Observable<ICityDBModel[]> = this._store.select(
    GameState.storedCityList$
  );
  readonly step$: Observable<Step> = this._store.select(GameState.step$);
  readonly cityName$: Observable<string> = this._store.select(GameState.city$);

  get storedCityList(): ICityDBModel[] {
    return this._store.selectSnapshot(GameState.storedCityList$);
  }

  get city(): string {
    return this._store.selectSnapshot(GameState.city$);
  }

  get step(): Step {
    return this._store.selectSnapshot(GameState.step$);
  }

  @ViewChild('inputCity') inputCity!: ElementRef;

  readonly prepeareCityForSearching = prepeareCityForSearching;
  readonly resizeElements = resizeElements;

  private map!: L.Map;
  public mapOptions!: L.MapOptions;
  private provider: any;

  readonly form = this._form.createMapForm();
  get cityFormCtrl(): FormControl {
    return this.form.get('city') as FormControl;
  }

  baseLayers = {
    'Cartographic map': MapConfig.OFFERS_OPEN_STREET_MAP,
    'Map view': MapConfig.OFFERS_HYBRID_MAP,
  };
  overlays = {
    // 'Vehicle': this.vehicleMarker
  };

  ngOnInit(): void {
    this.initializeMapOptions();
    this.initForm();
    this.initSubscriptions();
  }

  ngAfterViewInit(): void {
    this.initAfterSubscriptions();
  }

  private initializeMapOptions(): void {
    this.mapOptions = {
      center: L.latLng(51.505, 14.01),
      zoom: 12,
      zoomControl: false,
      layers: [MapConfig.OFFERS_OPEN_STREET_MAP],
    };
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.setMaxBounds([
      [-90, -180],
      [90, 180],
    ]);

    this.map.addControl(L.control.zoom({ position: 'bottomleft' }));
    this.map.addControl(
      L.control.layers(this.baseLayers, this.overlays, {
        position: 'bottomright',
      })
    );

    const provider = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider,
      style: 'bar',
      autoCompleteDelay: 300,
      showMarker: false,
      searchLabel: 'Поиск',
    });
    this.provider = provider;
    this.map.addControl(searchControl);
  }

  private initForm(): void {
    //MapGameFormsService;
    //this._store.dispatch(new GameAction.Error);
  }
  private initSubscriptions(): void {
    //MapGameFormsService;
    this.form.valueChanges
      .pipe(
        tap((val) => console.log(111111, 'val', val)),
        takeUntil(this._destroy$)
      )
      .subscribe();

    this.city$$
      .pipe(
        filter(Boolean),
        tap((val) => console.log(val)),
        switchMap((city) =>
          iif(
            () => checkTypeCityIsCityDBModel(city),
            of([city]),
            this.provider.search({ query: city })
          )
        ),
        catchError((error) =>
          this._store.dispatch(new GameAction.Error(error))
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        console.log('res', res);
        this.getCityName(res as any[]);
      });

    this.repeatSearchCity$$
      .pipe(
        tap((character) =>
          console.log(111111, 'Повторный запрос before', character)
        ),
        delay(5000),
        tap((character) => console.log(111111, 'Повторный запрос', character)),
        takeUntil(this._destroy$)
      )
      .subscribe((character) => {
        console.log(1111111, 'GetCityList 2');
        this._store.dispatch(new GameAction.GetCityList(character));
      });

    this.lastCityLetter$$
      .pipe(
        tap((val) => {
          console.log(1111111, 'lastCityLetter$$', val);
          // debugger;
        }),
        filter(Boolean),
        switchMap(() => timer(10000)),
        withLatestFrom(this.lastCityLetter$$, this.storedCityList$),
        map(([, character, storedCityList]) => {
          return { character, storedCityList };
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((obj) => {
        const { character, storedCityList } = obj;
        //debugger;
        if (
          storedCityList.findIndex(
            (city) => city.name[0].toLowerCase() === character
          ) !== -1
        ) {
          const index = storedCityList.findIndex(
            (city) => city.name[0].toLowerCase() === character
          );
          this.city$$.next(storedCityList[index]);
        } else {
          console.log(1111111, 'GetCityList 1');
          this._store.dispatch(new GameAction.GetCityList(character));
        }

        /*TODO Логика
          Заглянуть в список прихраннённых городов
          Если есть город на букву, то this.city$$.next(город)
          Если нет, то делать запрос this._store.dispatch(new GameAction.GetCityList(character))
         */
        //this._store.dispatch(new GameAction.GetCityList(character));
      });

    this.setCityName$$
      .pipe(
        filter(Boolean),
        tap((name) => this._store.dispatch(new GameAction.SetCityName(name))),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this._store.dispatch(new GameAction.ToggleStep()));

    this._actions
      .pipe(
        ofActionCompleted(GameAction.ToggleStep),
        // withLatestFrom(this.step$),
        // map(([, step]) => step),
        switchMap(() => this.step$),
        tap((step) => {
          //debugger;
          console.log(step);
        }),
        filter((step) => step === 'opponent'),

        takeUntil(this._destroy$)
      )
      .subscribe(() =>
        this.lastCityLetter$$.next(getCityLastLetter(this.city))
      );

    this._actions
      .pipe(
        /*TODO Срабатывает несколько раз */
        ofActionSuccessful(GameAction.GetCityListSuccess),
        switchMap(() => this.step$),
        filter((step) => step === 'opponent'),
        //take(1),
        tap((val) => console.log(111111, 'GetCityListSuccess', val)),
        switchMap(() => this.storedCityList$),
        takeUntil(this._destroy$)
      )
      .subscribe((storedCityList) => {
        console.log(1111111, 'storedCityList', storedCityList);

        const index = storedCityList.findIndex(
          (town) => town.name[0].toLowerCase() === getCityLastLetter(this.city)
        );

        if (index !== -1) {
          console.log('index', index);
          this.city$$.next(storedCityList[index]);
          /*TODO
            - Удалить город их списка storedCity
            - Добавить город в список используемых
          */
        } else {
          //this.repeatSearchCity$$.next(getCityLastLetter(this.city));
        }
      });
  }

  private initAfterSubscriptions(): void {
    this.cityName$
      .pipe(
        filter((city) => !!city && this.step === 'opponent'),
        switchMap((city) =>
          interval(150).pipe(
            scan((acc, value) => acc + city[value], ''),
            tap((val) => (this.inputCity.nativeElement.value = val)),
            take(city.length)
          )
        ),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  findCity(): void {
    this.city$$.next(this.cityFormCtrl.value);
  }

  private getCityName(results: any[]): void {
    if (results?.length === 1 && checkTypeCityIsCityDBModel(results[0])) {
      this.cityIsExist(results[0]);
    } else if (results?.length) {
      let target = null;
      for (let i = 0; i < results.length; i++) {
        if (
          results[i].raw.addresstype === 'city' ||
          results[i].raw.addresstype === 'town'
        ) {
          target = results[i];
          break;
        }
      }

      this.cityIsExist(target);
    } else {
      console.log('Не найден');
    }
  }

  private cityIsExist(city: any): void {
    const town = prepeareCityForSearching(city);
    console.log('town  1', town);

    !!town
      ? this.setCity(town)
      : console.log('Подсветить пользователю, что нет такого города');
  }

  private setCity(city: ICityModel): void {
    const { name } = city;

    this.flyToCity(city);
    this.setCityName$$.next(name);
  }

  private flyToCity(city: ICityModel): void {
    const { latitude, longitude, name } = city;
    let cityCoordinates = L.latLng(latitude as number, longitude as number);
    this.map.flyTo(cityCoordinates);
    addMarker(this.map, name, latitude as number, longitude as number);
  }
}
