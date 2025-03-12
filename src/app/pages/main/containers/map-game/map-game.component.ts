import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
import { TuiIcon, TuiTextfield } from '@taiga-ui/core';

import { DestroyService } from '../../../../shared/services/destroy.service';
import { filter, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { TuiBreakpointService } from '@taiga-ui/core';
import {
  addMarker,
  prepeareCityForSearching,
  resizeElements,
} from '../../utils';
import { CityModel } from '../../models';
import { AsyncPipe } from '@angular/common';
import { FunctionPipe } from '../../../../shared/pipes';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-map-game',
  imports: [
    LeafletModule,
    ReactiveFormsModule,
    TuiIcon,
    TuiTextfield,
    TuiTooltip,
    FormsModule,
    TuiLet,
    AsyncPipe,
    FunctionPipe,
  ],
  templateUrl: './map-game.component.html',
  styleUrl: './map-game.component.less',
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapGameComponent implements OnInit {
  private readonly destroy$ = inject(DestroyService);
  private readonly _form = inject(MapGameFormsService);
  private readonly _store = inject(Store);

  readonly _breakpoint$ = inject(TuiBreakpointService);

  readonly city$$ = new Subject<string>();
  readonly flyToCity$$ = new Subject<CityModel>();

  readonly prepeareCityForSearching = prepeareCityForSearching;
  readonly resizeElements = resizeElements;

  private map!: L.Map;
  public mapOptions!: L.MapOptions;
  private provider: any;

  readonly form = this._form.createMapForm();
  get city(): FormControl {
    return this.form.get('city') as FormControl;
  }

  protected value = '';

  baseLayers = {
    'Cartographic map': MapConfig.OFFERS_OPEN_STREET_MAP,
    'Map view': MapConfig.OFFERS_HYBRID_MAP,
  };
  overlays = {
    // 'Vehicle': this.vehicleMarker
  };

  ngOnInit() {
    this.initializeMapOptions();
    this.initForm();
    this.initSubscriptions();
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
  }
  private initSubscriptions(): void {
    //MapGameFormsService;
    this.form.valueChanges
      .pipe(
        tap((val) => console.log(111111, 'val', val)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.city$$
      .pipe(
        filter(Boolean),
        tap((val) => console.log(val)),
        switchMap((city) => this.provider.search({ query: city })),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        console.log('res', res);
        this.getCityName(res as any[]);
      });

    this.flyToCity$$
      .pipe(
        filter(Boolean),
        tap((city) => {
          let cityCoordinates = L.latLng(city.y as number, city.x as number);
          this.map.flyTo(cityCoordinates);
        }),
        // switchMap((city) =>
        //   this.provider.search({ query: `${city.y} ${city.x}` })
        // ),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => console.log(1111111, 'flyToCity', val));
  }

  findCity(): void {
    this.city$$.next(this.city.value);
  }

  private getCityName(results: any[]): void {
    if (results?.length) {
      let target = null;
      for (let i = 0; i < results.length; i++) {
        //results[i];
        if (
          results[i].raw.addresstype === 'city' ||
          results[i].raw.addresstype === 'town'
        ) {
          target = results[i];
          break;
        }
      }
      const town = prepeareCityForSearching(target);
      console.log('town', town);

      !!town
        ? this.setCity(town)
        : console.log('Подсветить пользователю, что нет такого города');
    } else {
      console.log('Не найден');
    }
  }

  private setCity(city: CityModel): void {
    const { y, x, name } = city;

    this.flyToCity(city);

    let lastLetter = name.charAt(name.length - 1);
    for (let i = 1; i < name.length; i++) {
      if (
        lastLetter === 'ь' ||
        lastLetter === 'ъ' ||
        lastLetter === 'ы' ||
        lastLetter === "'" ||
        lastLetter === '`'
      ) {
        lastLetter = name.charAt(name.length - i);
      }
    }
    console.log('lastLetter', lastLetter);
  }

  private flyToCity(city: CityModel): void {
    const { y, x, name } = city;
    let cityCoordinates = L.latLng(y as number, x as number);
    this.map.flyTo(cityCoordinates);
    addMarker(this.map, name, y as number, x as number);
  }

  // async flyToCity(cityObj: CityModel) {
  //   const results = await this.provider.search({ query: `${cityObj.lat} ${cityObj.long}` });
  //   console.log(1111, results)
  //   console.log(2222, cityObj.name)
  //   let name = cityObj.name;
  //   let coordinateY = results[0].y;
  //   let coordinateX = results[0].x;
  //   let cityCoordinates = L.latLng(coordinateY, coordinateX);
  //   this.map.flyTo(cityCoordinates);
  //   this.addSampleMarker(name, coordinateY, coordinateX);
  //   this.lastLetter = cityObj.name.charAt(cityObj.name.length - 1);
  //   if (this.lastLetter === 'ь' || this.lastLetter === 'ъ' || this.lastLetter === 'ы' || this.lastLetter === "'" || this.lastLetter === "`") {
  //     this.lastLetter = cityObj.name.charAt(cityObj.name.length - 2);
  //   }
  //   this.arrUsedCities.push({ name: cityObj.name.toLowerCase(), lat: coordinateY, long: coordinateX });
  //   this.arrValidCities = this.arrValidCities.filter(item => item.name !== cityObj.name.toLowerCase());
  //   this.arrValidCities = this.arrValidCities.filter((item, index) => { // Убираем повторяющиеся значения
  //     return this.arrValidCities.indexOf(item) === index
  //   });
  //   console.log('this.arrUsedCities from flyToCity', this.arrUsedCities);
  //   console.log('this.arrUsedCities cityObj', cityObj.name);
  //   console.log('this.arrValidCities from flyToCity', this.arrValidCities);
  // }
}
