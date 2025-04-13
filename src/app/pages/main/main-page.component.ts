import { Component, inject, signal } from '@angular/core';
import { MapGameComponent } from './containers/map-game/map-game.component';
import { TuiBreakpointService } from '@taiga-ui/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FunctionPipe } from '../../shared/pipes';
import { TuiLet } from '@taiga-ui/cdk';
import { Store } from '@ngxs/store';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { ICityDBModel } from './models';
import { GameState } from './state/game.state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DestroyService } from '../../shared/services/destroy.service';

@Component({
  selector: 'app-main-page',
  imports: [MapGameComponent, AsyncPipe, FunctionPipe, TuiLet, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.less',
  providers: [DestroyService],
})
export class MainPageComponent {
  private readonly _store = inject(Store);
  private readonly _destroy$ = inject(DestroyService);

  readonly _breakpoint$ = inject(TuiBreakpointService);

  readonly usedCityList$: Observable<ICityDBModel[]> = this._store.select(
    GameState.usedCityList$
  );

  get usedCityList(): ICityDBModel[] {
    return this._store.selectSnapshot(GameState.usedCityList$);
  }

  usedCityListSig = signal<ICityDBModel[]>([{ name: '' }]);

  cityList$ = toObservable(this.usedCityListSig).pipe(
    switchMap(() => this.usedCityList$),
    takeUntil(this._destroy$)
  );

  cityListSig = toSignal(this.cityList$);
}
