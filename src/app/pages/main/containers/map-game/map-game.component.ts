import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
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
import {
  TUI_CONFIRM,
  TuiChip,
  TuiDrawer,
  TuiPulse,
  TuiTooltip,
} from '@taiga-ui/kit';
import {
  tuiDialog,
  TuiDialogContext,
  TuiDialogService,
  TuiIcon,
  TuiLoader,
  TuiPopup,
  TuiTextfield,
} from '@taiga-ui/core';

import { DestroyService } from '../../../../shared/services/destroy.service';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
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
  deleteCharacters,
  getCityLastLetter,
  getRandomSymbol,
  prepeareCityForSearching,
  removeUnnecessaryCharacters,
  resizeElements,
} from '../../utils';
import { ICityDBModel, ICityModel, Step } from '../../models';
import { AsyncPipe, CommonModule } from '@angular/common';
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
import {
  isNullOrEmptyString,
  isNullOrUndefined,
} from '../../../../shared/utils';
import { MapTimerComponent } from '../../components/map-timer/map-timer.component';
import { MapDialogComponent } from '../../components/map-dialog/map-dialog.component';
import { Router } from '@angular/router';
import { UsedCitiesListComponent } from '../../components/used-cities-list/used-cities-list.component';

@Component({
  selector: 'app-map-game',
  imports: [
    TuiPulse,
    MapTimerComponent,
    CommonModule,
    LeafletModule,
    ReactiveFormsModule,
    TuiIcon,
    TuiLoader,
    TuiChip,
    TuiTextfield,
    TuiPopup,
    TuiDrawer,
    TuiTooltip,
    FormsModule,
    TuiLet,
    AsyncPipe,
    FunctionPipe,
    UsedCitiesListComponent,
  ],
  templateUrl: './map-game.component.html',
  styleUrl: './map-game.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MapGameComponent implements OnInit, AfterViewInit {
  private readonly _destroy$ = inject(DestroyService);
  private readonly _form = inject(MapGameFormsService);
  private readonly _store = inject(Store);
  private readonly _actions = inject(Actions);
  private readonly _router = inject(Router);
  private readonly _dialogs = inject(TuiDialogService);

  readonly _breakpoint$ = inject(TuiBreakpointService);

  readonly city$$ = new Subject<ICityDBModel | string>();
  readonly flyToCity$$ = new Subject<ICityModel>();
  readonly lastCityLetter$$ = new Subject<string>();
  readonly setCityName$$ = new Subject<string>();
  readonly changeMove$$ = new Subject<boolean>();
  readonly repeatSearchCity$$ = new Subject<string>();
  readonly sendData$ = new Subject<boolean>();

  readonly usedCityList$: Observable<ICityDBModel[]> = this._store.select(
    GameState.usedCityList$
  );
  readonly storedCityList$: Observable<ICityDBModel[]> = this._store.select(
    GameState.storedCityList$
  );
  readonly city$: Observable<string> = this._store.select(GameState.city$);
  readonly step$: Observable<Step> = this._store.select(GameState.step$);
  readonly cityName$: Observable<string> = this._store.select(GameState.city$);
  readonly score$: Observable<number> = this._store.select(GameState.score$);

  readonly openDrawer = signal(false);

  get storedCityList(): ICityDBModel[] {
    return this._store.selectSnapshot(GameState.storedCityList$);
  }

  get usedCityList(): ICityDBModel[] {
    return this._store.selectSnapshot(GameState.usedCityList$);
  }

  get city(): string {
    return this._store.selectSnapshot(GameState.city$);
  }

  get step(): Step {
    return this._store.selectSnapshot(GameState.step$);
  }

  get currentLanguage(): string {
    return this._store.selectSnapshot(GameState.currentLanguage$);
  }

  @ViewChild('inputCity') inputCity!: ElementRef;

  readonly prepeareCityForSearching = prepeareCityForSearching;
  readonly resizeElements = resizeElements;
  readonly isNullOrEmptyString = isNullOrEmptyString;
  readonly getCityLastLetter = getCityLastLetter;
  readonly deleteCharacters = deleteCharacters;

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

  private readonly dialogPage = tuiDialog(MapDialogComponent, {
    dismissible: false,
    size: 'fullscreen',
    closeable: false,
  });

  private readonly dialogWindow = tuiDialog(MapDialogComponent, {
    dismissible: true,
    size: 'l',
    closeable: true,
  });

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
    this.map.doubleClickZoom.disable();
  }

  private initForm(): void {
    this._store.dispatch(
      new GameAction.SetCityName(getRandomSymbol(this.currentLanguage))
    );
    //MapGameFormsService;
    //this._store.dispatch(new GameAction.Error);
  }
  private initSubscriptions(): void {
    this.sendData$
      .pipe(filter(Boolean), debounceTime(300), takeUntil(this._destroy$))
      .subscribe(() => this.findCity());
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
        debounceTime(300),
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
        //distinctUntilChanged(),
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
        withLatestFrom(this.step$),
        map(([, step]) => step),
        //switchMap(() => this.step$),
        distinctUntilChanged(),
        tap((step) => {
          //debugger;
          console.log(step);
        }),
        filter((step) => step === 'opponent'),

        takeUntil(this._destroy$)
      )
      .subscribe(() =>
        this.lastCityLetter$$.next(
          getCityLastLetter(deleteCharacters(this.city)).toLowerCase()
        )
      );

    this._actions
      .pipe(
        ofActionSuccessful(GameAction.AddCityToUsedCityList),
        map((obj) => obj.city.name),
        distinctUntilChanged(),
        tap(() => {
          const score = this.step === 'user' ? 100 : 50;
          this._store.dispatch(new GameAction.AddScore(score));
        }),
        //distinctUntilChanged((prev, curr) => prev.name === curr.name),
        tap((val) => console.log(4444, val)),
        takeUntil(this._destroy$)
      )
      .subscribe((name) =>
        this._store.dispatch(new GameAction.DeleteCityFromStoredCityList(name))
      );

    this._actions
      .pipe(
        ofActionSuccessful(GameAction.GetCityListSuccess),
        //tap((val) => console.log(111111, 'Проверить список городов', val)),
        withLatestFrom(this.step$),
        map(([, step]) => step),
        //switchMap(() => this.step$),
        //tap((val) => console.log(111111, 'Проверить шаг', val)),
        filter((step) => step === 'opponent'),
        //distinctUntilChanged(),
        //take(1),
        //tap((val) => console.log(111111, 'GetCityListSuccess', val)),
        withLatestFrom(this.storedCityList$),
        map(([, storedCityList]) => storedCityList),
        //switchMap(() => this.storedCityList$),
        takeUntil(this._destroy$)
      )
      .subscribe((storedCityList) => {
        //console.log(1111111, 'storedCityList', storedCityList);
        const cityList = storedCityList as ICityDBModel[];

        const index = cityList.findIndex(
          (town) => town.name[0].toLowerCase() === getCityLastLetter(this.city)
        );

        if (index !== -1) {
          //console.log('index', index);
          this.city$$.next(cityList[index]);
        } else {
          this.repeatSearchCity$$.next(getCityLastLetter(this.city));
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
    if (
      (isNullOrEmptyString(this.cityFormCtrl.value) ||
        (!isNullOrEmptyString(this.city) &&
          this.cityFormCtrl.value.trim()?.[0].toLowerCase() !==
            getCityLastLetter(this.city))) &&
      this.step === 'user'
    ) {
      this.showDialogWindow(
        `Введите город на букву ${getCityLastLetter(this.city).toUpperCase()}`
      );
      return;
    }
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
      this.showDialogWindow('Не могу найти такого города. Попробуйте другой');
    }
  }

  private cityIsExist(city: any): void {
    const town = prepeareCityForSearching(city);

    const townIsUsed = this.usedCityList.find(
      (item) => item.name === town?.name
    );
    if (!!townIsUsed) {
      if (this.step === 'user') {
        this.showDialogWindow(
          `${town?.name} - данный город уже был использован. Он есть в списке ранее использованных городов. Введите другой`
        );
        return;
      }
      console.log('Логика от компа');
      return;
    }

    !!town
      ? this.setCity(town)
      : this.showDialogWindow('Не могу найти такого города. Попробуйте другой');
  }

  private setCity(city: ICityModel): void {
    const { name } = city;

    this.flyToCity(city);
    this._store.dispatch(new GameAction.AddCityToUsedCityList(city));

    this.setCityName$$.next(name);
  }

  private flyToCity(city: ICityModel): void {
    const { latitude, longitude, name } = city;
    let cityCoordinates = L.latLng(latitude as number, longitude as number);
    this.map.flyTo(cityCoordinates);
    addMarker(this.map, name, latitude as number, longitude as number);
  }

  stopPropogation(event: Event): void {
    console.log(1111);
    event.stopImmediatePropagation();
  }

  showDialogEndTimer(): void {
    this.dialogPage({ type: 'fullscreen', header: 'Время вышло' })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          console.info(`Dialog emitted data = ${data}`);
          //this.dialogWindow.complete();
        },
        complete: () => {
          console.info('Dialog closed');
          //this._router.navigate(['/start']);
        },
      });
  }

  showDialogWindow(content: string): void {
    this.dialogWindow({ type: 'window', header: 'Ошибка', content })
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          console.info(`Dialog emitted data = ${data}`);
        },
        complete: () => {
          console.info('Dialog closed');
        },
      });
  }
}
