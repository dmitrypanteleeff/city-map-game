import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FunctionPipe } from '../../../../shared/pipes';
import { TuiLet } from '@taiga-ui/cdk';
import {
  TuiBreakpointService,
  TuiScrollbar,
  TuiButton,
  TuiIcon,
} from '@taiga-ui/core';
import * as content from './used-cities-list.config';
import { Store } from '@ngxs/store';
import { DestroyService } from '../../../../shared/services/destroy.service';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { ICityDBModel } from '../../models';
import { GameState } from '../../state/game.state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LanguageTypeName } from '../../../../shared/models';
import { getContentByLanguage } from '../../utils';

@Component({
  selector: 'app-used-cities-list',
  imports: [
    AsyncPipe,
    FunctionPipe,
    TuiLet,
    CommonModule,
    TuiScrollbar,
    TuiButton,
    TuiIcon,
  ],
  host: { class: 'd-block' },
  templateUrl: './used-cities-list.component.html',
  styleUrl: './used-cities-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class UsedCitiesListComponent {
  /** Закрытие окна */
  @Output() onClose = new EventEmitter<void>();

  private readonly _store = inject(Store);
  private readonly _destroy$ = inject(DestroyService);

  readonly _breakpoint$ = inject(TuiBreakpointService);

  readonly usedCityList$: Observable<ICityDBModel[]> = this._store.select(
    GameState.usedCityList$
  );

  readonly language$: Observable<LanguageTypeName> = this._store.select(
    GameState.language$
  );

  get usedCityList(): ICityDBModel[] {
    return this._store.selectSnapshot(GameState.usedCityList$);
  }

  readonly getContentByLanguage = getContentByLanguage;
  readonly content = content;

  usedCityListSig = signal<ICityDBModel[]>([{ name: '' }]);

  cityList$ = toObservable(this.usedCityListSig).pipe(
    switchMap(() => this.usedCityList$),
    takeUntil(this._destroy$)
  );

  cityListSig = toSignal(this.cityList$);
}
