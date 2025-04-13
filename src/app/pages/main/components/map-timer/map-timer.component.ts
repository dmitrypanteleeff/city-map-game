import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  TemplateRef,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  distinctUntilChanged,
  finalize,
  interval,
  map,
  Observable,
  startWith,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { DestroyService } from '../../../../shared/services/destroy.service';
import { AsyncPipe } from '@angular/common';
import { Actions, ofActionCompleted } from '@ngxs/store';
import { GameAction } from '../../state/game.actions';
import { showTimerOrInfinity } from '../../utils';
import { FunctionPipe } from '../../../../shared/pipes';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import type { PolymorpheusContent } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-map-timer',
  imports: [AsyncPipe, FunctionPipe],
  templateUrl: './map-timer.component.html',
  styleUrl: './map-timer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MapTimerComponent implements OnInit {
  private readonly _destroy$ = inject(DestroyService);
  private readonly _actions = inject(Actions);

  /** Завершение таймера */
  @Output() readonly onSuccess = new EventEmitter<boolean>();

  public counter = signal<number>(50);
  number = 500;

  public doubleCounter = computed<number>(() => {
    return this.counter() * 2;
  });

  timer$!: Observable<number | null>;

  readonly showTimerOrInfinity = showTimerOrInfinity;

  testFunc(): void {
    this.counter.update((value) => value + 1);
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.timer$ = interval(1000).pipe(
      map((val) => this.number - val),
      takeWhile((val) => val >= 0),
      finalize(() => this.onSuccess.emit(true)),
      takeUntil(this._destroy$)
    );

    this._actions
      .pipe(ofActionCompleted(GameAction.ToggleStep), takeUntil(this._destroy$))
      .subscribe(() => (this.number += 50));
  }
}
